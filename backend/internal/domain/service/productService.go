package service

import (
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure/repository"
)

type ProductService struct {
	repo *repository.ProductRepository
}

func NewProductService(r *repository.ProductRepository) *ProductService {
	return &ProductService{
		repo: r,
	}
}

func (s *ProductService) Create(product *model.Product) (*model.Product, error) {
	return s.repo.Store(product)
}

func (s *ProductService) GetAll() ([]*model.Product, error) {
	return s.repo.FindAll()
}

func (s *ProductService) GetByID(id int64) (*model.Product, error) {
	return s.repo.FindByID(id)
}

func (s *ProductService) DeleteByID(id int64) error {
	return s.repo.DeleteByID(id)
}

func (s *ProductService) CheckSeller(id int) (*string, error) {
	return s.repo.CheckSeller(id)
}
