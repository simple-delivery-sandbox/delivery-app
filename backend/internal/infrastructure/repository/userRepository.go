package repository

import (
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure"
)

type UserRepository struct {
	Handler *infrastructure.SqlHandler
}

func NewUserRepository(handler *infrastructure.SqlHandler) *UserRepository {
	return &UserRepository{Handler: handler}
}

func (r *UserRepository) Store(user *model.User) error {
	_, err := r.Handler.Execute(
		"INSERT INTO users (email, password) VALUES (?, ?)",
		user.Email, user.Password,
	)

	return err
}

func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	row, err := r.Handler.Query(
		"SELECT id, email, password FROM users WHERE email = $1",
		email,
	)
	if err != nil {
		return nil, err
	}
	defer row.Close()

	if row.Next() {
		user := model.User{}
		if err := row.Scan(&user.ID, &user.Email, &user.Password); err != nil {
			return nil, err
		}
		return &user, nil
	}

	return nil, nil
}
