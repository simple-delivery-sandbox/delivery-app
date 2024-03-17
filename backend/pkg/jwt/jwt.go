package jwt

import (
	"errors"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

func JwtWithRoleMiddleware(roles []string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Authorization header is required")
			}

			tokenString := authHeader[len("Bearer "):]
			if tokenString == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Token is required")
			}

			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, errors.New("unexpected signing method")
				}

				return []byte(os.Getenv("JWT_SECRET_KEY")), nil
			})
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok || !token.Valid {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid token")
			}

			if roleClaims, ok := claims["roles"].([]interface{}); ok {
				for _, roleClaims := range roleClaims {
					for _, role := range roles {
						if roleClaims == role {
							userID, ok := claims["sub"]
							if !ok {
								return echo.NewHTTPError(http.StatusUnauthorized, "invalid user")
							}
							c.Set("user", userID)
							return next(c)
						}
					}
				}
			}

			return echo.NewHTTPError(http.StatusForbidden, "invalid role")
		}
	}
}
