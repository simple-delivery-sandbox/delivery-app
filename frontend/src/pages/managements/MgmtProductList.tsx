import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
}

export default function MgmtProductList() {
    const [products, setProducts] = useState<Product[] | null>([] || null);

    useEffect(() => {
        const newProduct: Product = {
            id: 1,
            title: "Product 1",
            description: "Product 1 Description",
            price: 125,
            imageUrl: "https://dummyimage.com/600x400/000/fff",
            createdAt: new Date()
        };
        setProducts([newProduct]);
    }, [])

    return (
        <div>
            <h2 className="text-3xl font-bold">Product List</h2>
            <div className="flex flex-row-reverse">
                <Link to="/management/products/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Product
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created_at
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products!.map((product) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link to={`/management/products/${product.id}`}>
                                        {product.title}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {product.description}
                                </td>
                                <td className="px-6 py-4">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.createdAt.toString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}