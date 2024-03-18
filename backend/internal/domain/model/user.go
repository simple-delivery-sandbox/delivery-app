package model

// CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     role ENUM('user', 'seller', 'admin') NOT NULL
// );

type User struct {
	ID       uint   `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
