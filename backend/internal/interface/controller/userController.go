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
	user, err := c.userUsecase.Login(user.Email, user.Password)
	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, err.Error())
	}
	return ctx.JSON(http.StatusOK, user)
}
