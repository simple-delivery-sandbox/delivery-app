package model

// CREATE TABLE IF NOT EXISTS products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     seller_id BIGINT UNSIGNED NOT NULL,
//     category VARCHAR(100),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (seller_id) REFERENCES users(id)
// ) ENGINE=InnoDB;

type Product struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	SellerID    int64   `json:"seller_id"`
	Category    string  `json:"category"`
	ImageURL    string  `json:"image_url"`
	CreatedAt   string  `json:"created_at"`
}
