import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

export default function ProductList() {

    const [products, setProducts] = useState([
        {
            "id": 1,
            "title": "Product 1",
            "description": "This is product 1",
            "price": 100,
            "category": "Category 1",
            "created_at": "2021-01-01T00:00:00",
        },
        {
            "id": 2,
            "title": "Product 2",
            "description": "This is product 2",
            "price": 200,
            "category": "Category 2",
            "created_at": "2021-01-02T00:00:00",
        }
    ]);

    useEffect(() => {
        
    }, [])

    return (
        <div className="container mt-4">
          <div className="row">
            {products.map(product => (
              <div className="col-md-4" key={product.id}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
}