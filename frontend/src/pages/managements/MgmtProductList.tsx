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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setFormData({});
        setImageFile(null);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    }

    const handleSave = () => {
        console.log("Create product with data: ", formData);
        console.log("Image file: ", imageFile);
        toggleModal();
    }

    const handleCancel = () => {
        setFormData({});
        setImageFile(null);
        toggleModal();
    }

    return (
        <div>
            <h2 className="text-3xl font-bold">Product List</h2>
            <div className="flex flex-row-reverse">
                <button 
                    onClick={toggleModal}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Create Product
                </button>
            </div>

            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Product
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label form="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
                                    <input value={formData.title || ""} onChange={handleInputChange} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product title" required />

                                    <label form="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                    <input value={formData.description || ""} onChange={handleInputChange} type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product description" required />

                                    <label form="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                                    <input value={formData.price || ""} onChange={handleInputChange} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product price" required />

                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" form="image">Image</label>
                                    <input onChange={handleImageChange} type="file" name="image" id="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required />

                                    <div>
                                        <button onClick={handleSave} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                        <button onClick={handleCancel} type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={product.id}>
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