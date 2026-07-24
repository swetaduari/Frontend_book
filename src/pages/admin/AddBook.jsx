import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../services/bookService";
import { getAllCategories } from "../../services/categoryService";

export default function AddBook() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [preview, setPreview] = useState(null);

    const [image, setImage] = useState(null);

    const [book, setBook] = useState({

        title: "",

        author: "",

        isbn: "",

        description: "",

        price: "",

        quantity: "",

        categoryId: ""

    });

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

    const handleChange = (e) => {

        setBook({

            ...book,

            [e.target.name]: e.target.value

        });

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", book.title);
            formData.append("author", book.author);
            formData.append("isbn", book.isbn);
            formData.append("description", book.description);
            formData.append("price", book.price);
            formData.append("quantity", book.quantity);

            formData.append("sellerId", 1);

            formData.append("categoryId", book.categoryId);

            formData.append("image", image);

            await addBook(formData);

            alert("Book Added Successfully");

            setBook({

                title: "",

                author: "",

                isbn: "",

                description: "",

                price: "",

                quantity: "",

                categoryId: ""

            });

            setImage(null);

            setPreview(null);

        } catch (err) {

            console.log(err);

            alert("Unable to Add Book");

        }

    };

    return (

        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-5">

            <div className="max-w-6xl mx-auto">

                <button

                    onClick={() => navigate("/admin/BookDashboard")}

                    className="mb-6 bg-white border rounded-full px-5 py-2 shadow hover:bg-gray-100"

                >

                    ← Back

                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8">

                        <h1 className="text-4xl font-bold text-white">

                            📚 Add New Book

                        </h1>

                        <p className="text-blue-100 mt-3">

                            Fill all details to publish a new book.

                        </p>

                    </div>

                    <form

                        onSubmit={handleSubmit}

                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8"

                    >

                        <div>

                            <label className="font-semibold">

                                Book Title

                            </label>

                            <input

                                type="text"

                                name="title"

                                value={book.title}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Author

                            </label>

                            <input

                                type="text"

                                name="author"

                                value={book.author}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                ISBN

                            </label>

                            <input

                                type="text"

                                name="isbn"

                                value={book.isbn}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Price

                            </label>

                            <input

                                type="number"

                                name="price"

                                value={book.price}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Quantity

                            </label>

                            <input

                                type="number"

                                name="quantity"

                                value={book.quantity}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Category

                            </label>

                            <select

                                name="categoryId"

                                value={book.categoryId}

                                onChange={handleChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            >

                                <option value="">

                                    Select Category

                                </option>

                                {categories.map((cat) => (

                                    <option

                                        key={cat.categoryId}

                                        value={cat.categoryId}

                                    >

                                        {cat.categoryName}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="lg:col-span-2">

                            <label className="font-semibold">

                                Description

                            </label>

                            <textarea

                                name="description"

                                value={book.description}

                                onChange={handleChange}

                                rows="4"

                                className="w-full mt-2 border rounded-xl p-3"

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Upload Book Image

                            </label>

                            <input

                                type="file"

                                accept="image/*"

                                onChange={handleImageChange}

                                className="w-full mt-2 border rounded-xl p-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Image Preview

                            </label>

                            <div className="mt-2">

                                {preview ? (

                                    <img

                                        src={preview}

                                        alt="preview"

                                        className="h-56 w-44 object-cover rounded-xl border shadow"

                                    />

                                ) : (

                                    <div className="h-56 w-44 border rounded-xl flex items-center justify-center text-gray-400">

                                        No Image

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="lg:col-span-2 flex justify-center">

                            <button

                                type="submit"

                                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-3 rounded-xl"

                            >

                                Add Book

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}