package service

import (
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure/repository"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(r *repository.UserRepository) *UserService {
	return &UserService{
		repo: r,
	}
}

func (s *UserService) SignUp(user *model.User) error {
	return s.repo.Store(user)
}

func (s *UserService) Login(email, password string) (*model.User, error) {
	return s.repo.FindByEmail(email)
}
