package usecase

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
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

func (uc *UserUsecase) Login(email, password string) (*map[string]interface{}, error) {
	response := make(map[string]interface{})
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

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss":   "delivery-app",
		"sub":   int64(user.ID),
		"aud":   os.Getenv("JWT_AUDIENCE"),
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
		"iat":   time.Now().Unix(),
		"roles": []string{user.Role},
	})
	token, err := claims.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		return nil, err
	}
	response["access_token"] = token
	response["role"] = user.Role
	return &response, nil
}

func (uc *UserUsecase) UserInfo(id int) (*model.User, error) {
	return uc.userService.UserInfo(id)
}
