package usecase

import (
	"errors"
	"mime/multipart"

	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/service"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure"
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

func (uc *ProductUsecase) Create(product model.Product, file *multipart.FileHeader) (*model.Product, error) {
	role, err := uc.productService.CheckSeller(int(product.SellerID))
	if err != nil {
		return nil, err
	}
	if *role != "seller" {
		return nil, errors.New("you are not a seller")
	}

	localStorage := infrastructure.NewLocalStorage()
	src, err := file.Open()
	if err != nil {
		return nil, err
	}
	defer src.Close()

	imageURL, err := localStorage.UploadFile(src, file.Filename)
	if err != nil {
		return nil, err
	}
	product.ImageURL = *imageURL

	return uc.productService.Create(&product)
}

func (uc *ProductUsecase) DeleteByID(id int64) error {
	return uc.productService.DeleteByID(id)
}
