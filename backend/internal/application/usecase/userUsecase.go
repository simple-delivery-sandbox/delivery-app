package usecase

import (
	"errors"

	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/service"
	"golang.org/x/crypto/bcrypt"
)

type UserUsecase struct {
	userService *service.UserService
}

func NewUserUsecase(userSerivce *service.UserService) *UserUsecase {
	return &UserUsecase{
		userService: userSerivce,
	}
}

func (uc *UserUsecase) SignUp(user *model.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	return uc.userService.SignUp(user)
}

func (uc *UserUsecase) Login(email, password string) (*model.User, error) {
	user, err := uc.userService.Login(email, password)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, errors.New("invalid password")
	}

	return user, nil
}
