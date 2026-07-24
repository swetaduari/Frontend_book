import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllBooks,
    deleteBook,
    updateBook,
    getAllCategories
} from "../../services/bookService";

export default function ViewBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
    category: {
        categoryId: ""
    }
});

const [preview, setPreview] = useState("");

    useEffect(() => {
        loadBooks();
        loadCategories();
    }, []);

    const loadBooks = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this book?")) return;

        try {
            await deleteBook(id);
            alert("Book Deleted Successfully");
            loadBooks();
        } catch (err) {
            console.log(err);
            alert("Unable to delete book");
        }
    };
const handleEdit = (book) => {

    setEditingBook(book);

    setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        description: book.description,
        price: book.price,
        quantity: book.quantity,
        image: null,
        category: {
            categoryId: book.category?.categoryId || ""
        }
    });

    if (book.image) {
        setPreview(`data:image/jpeg;base64,${book.image}`);
    } else {
        setPreview("");
    }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

   const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

        setForm({
            ...form,
            image: files[0]
        });

        setPreview(URL.createObjectURL(files[0]));

    } else if (name === "categoryId") {

        setForm({
            ...form,
            category: {
                categoryId: value
            }
        });

    } else {

        setForm({
            ...form,
            [name]: value
        });

    }
};
    const handleUpdate = async () => {

    try {

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("author", form.author);
        formData.append("isbn", form.isbn);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("quantity", form.quantity);

        formData.append(
            "sellerId",
            editingBook.seller.userId
        );

        formData.append(
            "categoryId",
            form.category.categoryId
        );

        if (form.image) {
            formData.append("image", form.image);
        }

        await updateBook(editingBook.book_id, formData);

        alert("Book Updated Successfully");

        setEditingBook(null);

        loadBooks();

    } catch (err) {

        console.log(err);

        alert("Unable to update book");

    }

};

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <button
                    onClick={() => navigate("/admin/BookDashboard")}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    ← Back to Book Dashboard
                </button>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-blue-700 p-6 sm:p-8">
                        <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-100">
                            Inventory overview
                        </p>
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            📚 All Books
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100 sm:text-base">
                            Review your current catalog, edit books, and remove outdated entries quickly.
                        </p>
                    </div>

                    {editingBook && (
                        <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <h2 className="text-xl font-semibold text-slate-800">Edit Book</h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                                <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                                <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                                <div className="md:col-span-2">

    <label className="block mb-2 font-semibold">
        Book Image
    </label>

    <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none w-full"
    />
    {preview && (

    <img
        src={preview}
        alt="preview"
        className="mt-4 h-44 w-32 object-cover rounded-xl border"
    />

)}

</div>
                                <select name="categoryId" value={form.category.categoryId} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none md:col-span-2">
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
                                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="4" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none md:col-span-2" />
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <button onClick={handleUpdate} className="rounded-2xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700">
                                    Update Book
                                </button>
                                <button onClick={() => setEditingBook(null)} className="rounded-2xl bg-slate-600 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="p-5 sm:p-6 lg:p-8">
                        <div className="overflow-x-auto rounded-[20px] border border-slate-200">
                            <table className="min-w-[900px] w-full text-left text-sm">
                                <thead className="bg-slate-900 text-white">
                                    <tr>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Author</th>
                                        <th className="p-3">ISBN</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Quantity</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Edit</th>
                                        <th className="p-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book.book_id} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                                            <td className="p-3">{book.book_id}</td>
                                            <td className="p-3">
                                                <img
    src={`http://localhost:9090/books/image/${book.book_id}`}
    alt={book.title}
    className="h-20 w-16 rounded-xl object-cover"
/>
                                            </td>
                                            <td className="p-3 font-semibold text-slate-800">{book.title}</td>
                                            <td className="p-3">{book.author}</td>
                                            <td className="p-3">{book.isbn}</td>
                                            <td className="p-3">₹ {book.price}</td>
                                            <td className="p-3">{book.quantity}</td>
                                            <td className="p-3">{book.category?.categoryName || "No Category"}</td>
                                            <td className="p-3">
                                                <button onClick={() => handleEdit(book)} className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600">
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button onClick={() => handleDelete(book.book_id)} className="rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white transition hover:bg-rose-700">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}