import { useEffect, useState } from "react";

import {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

export default function ManageCategories() {

    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState({
        categoryId: "",
        categoryName: ""
    });

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const res = await getAllCategories();

            setCategories(Array.isArray(res.data) ? res.data : []);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setCategory({
            ...category,
            categoryName: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await updateCategory(category.categoryId, category);

                alert("Category Updated");

            } else {

                await addCategory(category);

                alert("Category Added");

            }

            setCategory({
                categoryId: "",
                categoryName: ""
            });

            setEditing(false);

            loadCategories();

        } catch (err) {

            console.log(err);

            alert("Operation Failed");

        }

    };

    const handleEdit = (cat) => {

        setCategory(cat);

        setEditing(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Category?"))
            return;

        try {

            await deleteCategory(id);

            alert("Category Deleted");

            loadCategories();

        } catch (err) {

            console.log(err);

            alert("Cannot delete category");

        }

    };

    return (

        <div className="p-6">

            <div className="bg-white shadow rounded-xl p-6 mb-8">

                <h1 className="text-3xl font-bold mb-6">

                    {editing ? "Edit Category" : "Add Category"}

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex gap-4"
                >

                    <input
                        type="text"
                        placeholder="Category Name"
                        value={category.categoryName}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                        required
                    />

                    <button
                        className={`px-6 rounded text-white ${
                            editing
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {editing ? "Update" : "Add"}
                    </button>

                    {editing && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditing(false);

                                setCategory({
                                    categoryId: "",
                                    categoryName: ""
                                });

                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 rounded"
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden">

                <table className="min-w-full">

                    <thead className="bg-blue-600 text-white">

                        <tr>

                            <th className="p-4">ID</th>

                            <th className="p-4">Category</th>

                            <th className="p-4">Edit</th>

                            <th className="p-4">Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map((cat) => (

                            <tr
                                key={cat.categoryId}
                                className="border-b text-center"
                            >

                                <td className="p-4">
                                    {cat.categoryId}
                                </td>

                                <td className="p-4">
                                    {cat.categoryName}
                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                                    >
                                        Edit
                                    </button>

                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() => handleDelete(cat.categoryId)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}