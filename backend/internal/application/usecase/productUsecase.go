package usecase

import (
	"errors"

	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/service"
)

type ProductUsecase struct {
	productService *service.ProductService
}

func NewProductUsecase(productService *service.ProductService) *ProductUsecase {
	return &ProductUsecase{
		productService: productService,
	}
}

func (uc *ProductUsecase) GetAll() ([]*model.Product, error) {
	return uc.productService.GetAll()
}

func (uc *ProductUsecase) GetByID(id int64) (*model.Product, error) {
	return uc.productService.GetByID(id)
}

func (uc *ProductUsecase) Create(product model.Product) (*model.Product, error) {
	role, err := uc.productService.CheckSeller(int(product.SellerID))
	if err != nil {
		return nil, err
	}
	if *role != "seller" {
		return nil, errors.New("you are not a seller")
	}
	return uc.productService.Create(&product)
}

func (uc *ProductUsecase) DeleteByID(id int64) error {
	return uc.productService.DeleteByID(id)
}
