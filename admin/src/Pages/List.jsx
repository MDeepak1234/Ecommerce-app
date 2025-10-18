import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backend_url } from "../App";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.post(`${backend_url}/api/product/remove`, { id }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts(); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Products</h1>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src={p.image[0]}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{p.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 font-semibold">
                    ${p.price}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
