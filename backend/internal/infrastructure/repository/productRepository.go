package repository

import (
	"database/sql"

	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/domain/model"
	"github.com/simple-delivery-sandbox/delivery-app/backend/internal/infrastructure"
)

type ProductRepository struct {
	Handler *infrastructure.SqlHandler
}

func NewProductRepository(handler *infrastructure.SqlHandler) *ProductRepository {
	return &ProductRepository{Handler: handler}
}

func (r *ProductRepository) Store(product *model.Product) (*model.Product, error) {
	row, err := r.Handler.Execute(
		"INSERT INTO products (title, description, price, seller_id) VALUES (?, ?, ?, ?)",
		product.Title, product.Description, product.Price, product.SellerID,
	)
	if err != nil {
		return nil, err
	}

	id, err := row.LastInsertId()
	if err != nil {
		return nil, err
	}
	product.ID = id

	return product, nil
}

func (r *ProductRepository) FindAll() ([]*model.Product, error) {
	rows, err := r.Handler.Query(
		"SELECT * FROM products ORDER BY created_at DESC",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*model.Product

	for rows.Next() {
		var p model.Product
		err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.Price, &p.SellerID)
		if err != nil {
			return nil, err
		}
		products = append(products, &p)
	}

	return products, nil
}

func (r *ProductRepository) FindByID(id int64) (*model.Product, error) {
	row := r.Handler.QueryRow(
		"SELECT * FROM products WHERE id = ?",
		id,
	)

	product := model.Product{}

	err := row.Scan(
		&product.ID, &product.Title, &product.Description, &product.Price, &product.SellerID,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &product, nil
}

func (r *ProductRepository) DeleteByID(id int64) error {
	_, err := r.Handler.Execute(
		"DELETE FROM products WHERE id = ?",
		id,
	)
	if err != nil {
		return err
	}
	return nil
}

func (r *ProductRepository) CheckSeller(id int) (*string, error) {
	row := r.Handler.QueryRow(
		"SELECT role FROM users WHERE id = ?",
		id,
	)

	var role string
	err := row.Scan(&role)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &role, nil
}
