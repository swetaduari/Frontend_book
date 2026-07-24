import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/categoryService";

export default function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ categoryName: "" });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingCategory) {
                await updateCategory(editingCategory.categoryId, form);
                alert("Category Updated Successfully");
            } else {
                await addCategory(form);
                alert("Category Added Successfully");
            }

            setForm({ categoryName: "" });
            setEditingCategory(null);
            loadCategories();
        } catch (err) {
            console.log(err);
            alert("Unable to save category");
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setForm({ categoryName: category.categoryName });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        try {
            await deleteCategory(id);
            alert("Category Deleted Successfully");
            loadCategories();
        } catch (err) {
            console.log(err);
            alert("Unable to delete category");
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <button
                    onClick={() => navigate("/admin/BookDashboard")}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    ← Back to Book Dashboard
                </button>

                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 shadow-[0_22px_60px_rgba(15,23,42,0.10)] backdrop-blur">
                    <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-blue-700 p-6 sm:p-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-100">
                                    Category management
                                </p>
                                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                                    🏷️ Manage Categories
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100 sm:text-base">
                                    Create, update, and organize categories for your book catalog.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-sky-50 backdrop-blur">
                                <div className="font-semibold">{categories.length} categories</div>
                                <div className="text-sky-100">Ready to organize</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_0.9fr] lg:p-8">
                        <form onSubmit={handleSubmit} className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-800">
                                {editingCategory ? "Edit Category" : "Add Category"}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {editingCategory ? "Update the selected category" : "Create a new category for your inventory"}
                            </p>
                            <div className="mt-4 space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Category Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter category name"
                                    value={form.categoryName}
                                    onChange={(e) => setForm({ categoryName: e.target.value })}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    required
                                />
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <button type="submit" className="rounded-2xl bg-sky-600 px-5 py-2.5 font-semibold text-white transition hover:bg-sky-700">
                                    {editingCategory ? "Update Category" : "Add Category"}
                                </button>
                                {editingCategory && (
                                    <button type="button" onClick={() => { setEditingCategory(null); setForm({ categoryName: "" }); }} className="rounded-2xl bg-slate-600 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-800">Current Categories</h2>
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                                    {categories.length} items
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {categories.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                                        No categories added yet.
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <div key={category.categoryId} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="font-semibold text-slate-800">{category.categoryName}</p>
                                                <p className="text-sm text-slate-500">ID: {category.categoryId}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <button onClick={() => handleEdit(category)} className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(category.categoryId)} className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}