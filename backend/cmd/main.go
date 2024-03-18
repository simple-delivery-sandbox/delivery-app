package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/application/usecase"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/service"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure/repository"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/interface/controller"
	"github.com/simple-delivery-sandbox/delivery-app/backend/pkg/jwt"
)

func main() {
	e := echo.New()

	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	// データベース接続
	sqlHandler := infrastructure.NewSqlHandler()

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	userController := controller.NewUserController(usecase.NewUserUsecase(service.NewUserService(repository.NewUserRepository(sqlHandler))))
	productController := controller.NewProductController(usecase.NewProductUsecase(service.NewProductService(repository.NewProductRepository(sqlHandler))))

	// ルーティング
	e.POST("/signup", userController.SignUp)
	e.POST("/login", userController.Login)

	e.GET("/user/info", userController.UserInfo, jwt.JwtWithRoleMiddleware([]string{"user", "seller", "admin"}))
	e.POST("/product/create", productController.Create, jwt.JwtWithRoleMiddleware([]string{"seller"}))
	e.Logger.Fatal(e.Start(":8080"))
}
