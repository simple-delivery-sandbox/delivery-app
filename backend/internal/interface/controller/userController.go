package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/application/usecase"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
)

type UserController struct {
	userUsecase *usecase.UserUsecase
}

func NewUserController(userUsecase *usecase.UserUsecase) *UserController {
	return &UserController{
		userUsecase: userUsecase,
	}
}

func (c *UserController) SignUp(ctx echo.Context) error {
	user := new(model.User)
	if err := ctx.Bind(user); err != nil {
		return err
	}
	if err := c.userUsecase.SignUp(user); err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	return ctx.JSON(http.StatusCreated, "User created successfully")
}

func (c *UserController) Login(ctx echo.Context) error {
	user := new(model.User)
	if err := ctx.Bind(user); err != nil {
		return err
	}
	token, err := c.userUsecase.Login(user.Email, user.Password)
	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, err.Error())
	}
	return ctx.JSON(http.StatusOK, map[string]string{
		"access_token": *token,
	})
}

func (c *UserController) UserInfo(ctx echo.Context) error {
	userIDValue := ctx.Get("user")
	userID, ok := userIDValue.(float64)
	if !ok {
		return ctx.JSON(http.StatusUnauthorized, "Unauthorized")
	}
	user, err := c.userUsecase.UserInfo(int(userID))
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	response := map[string]interface{}{
		"id":    user.ID,
		"email": user.Email,
		"role":  user.Role,
	}
	return ctx.JSON(http.StatusOK, response)
}
