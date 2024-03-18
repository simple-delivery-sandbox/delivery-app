package controller

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/application/usecase"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
)

type ProductController struct {
	productUsecase *usecase.ProductUsecase
}

func NewProductController(productUsecase *usecase.ProductUsecase) *ProductController {
	return &ProductController{
		productUsecase: productUsecase,
	}
}

func (c *ProductController) GetAll(ctx echo.Context) error {
	products, err := c.productUsecase.GetAll()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusOK, products)
}

func (c *ProductController) GetByID(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 6)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, "invalid id")
	}
	product, err := c.productUsecase.GetByID(id)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusOK, product)
}

func (c *ProductController) Create(ctx echo.Context) error {
	userIDValue := ctx.Get("user")
	userID, ok := userIDValue.(float64)
	if !ok {
		return ctx.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	p := new(model.Product)
	if err := ctx.Bind(p); err != nil {
		return err
	}
	p.SellerID = int64(userID)

	product, err := c.productUsecase.Create(*p)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusCreated, product)
}

func (c *ProductController) DeleteByID(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 6)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, "invalid id")
	}
	err = c.productUsecase.DeleteByID(id)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusOK, "product deleted successfully")
}
