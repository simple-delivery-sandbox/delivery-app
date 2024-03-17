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
		"INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
		user.Email, user.Password, string("user"),
	)

	return err
}

func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	row, err := r.Handler.Query(
		"SELECT id, email, password, role FROM users WHERE email = ?",
		email,
	)
	if err != nil {
		return nil, err
	}
	defer row.Close()

	if row.Next() {
		user := model.User{}
		if err := row.Scan(&user.ID, &user.Email, &user.Password, &user.Role); err != nil {
			return nil, err
		}
		return &user, nil
	}

	return nil, nil
}

func (r *UserRepository) FindByID(id int) (*model.User, error) {
	row, err := r.Handler.Query(
		"SELECT id, email, role FROM users WHERE id = ?",
		id,
	)
	if err != nil {
		return nil, err
	}
	defer row.Close()

	if row.Next() {
		user := model.User{}
		if err := row.Scan(&user.ID, &user.Email, &user.Role); err != nil {
			return nil, err
		}
		return &user, nil
	}

	return nil, nil
}
