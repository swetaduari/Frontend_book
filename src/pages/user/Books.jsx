import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";
import { FaSearch } from "react-icons/fa";

export default function Books() {

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination
    const BOOKS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchBooks();
    }, []);
useEffect(() => {

    if (search.trim() === "") {

        setFilteredBooks(books);

    } else {

        const keyword = search.toLowerCase().trim();

        const filtered = books.filter((book) => {

            return (

                book.title?.toLowerCase().includes(keyword) ||

                book.author?.toLowerCase().includes(keyword) ||

                book.category?.categoryName?.toLowerCase().includes(keyword) ||

                book.isbn?.toLowerCase().includes(keyword)

            );

        });

        setFilteredBooks(filtered);

    }

    // Reset to first page whenever search changes
    setCurrentPage(1);

}, [search, books]);

    const fetchBooks = async () => {

        try {

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
            const res = await axios.get(`${API_URL}/books/all`);

            if (Array.isArray(res.data)) {

                setBooks(res.data);
                setFilteredBooks(res.data);

            } else {

                setBooks([]);
                setFilteredBooks([]);
                setError("Invalid response received from server.");

            }

        } catch (err) {

            console.error(err);
            setError("Failed to load books.");

        } finally {

            setLoading(false);

        }

    };

    // Pagination calculations
    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;

    const currentBooks = filteredBooks.slice(
        indexOfFirstBook,
        indexOfLastBook
    );

    if (loading) {

        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading Books...
            </div>
        );

    }

    if (error) {

        return (
            <div className="text-center py-20 text-red-600 font-semibold">
                {error}
            </div>
        );

    }

    return (
        <div className="px-2 sm:px-4 lg:px-6">

            <div className="mb-8 flex flex-col gap-4 rounded-[24px] border border-[#f1d8df] bg-white/80 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">

                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9a3550]">
                        Curated Collection
                    </p>

                    <h1 className="text-3xl font-bold text-[#2f1d24]">
                        All Books
                    </h1>
                </div>

                <div className="w-full md:w-[360px] lg:w-[420px]">
                    <div className="flex items-center rounded-full border border-[#ead6dd] bg-[#fffafc] px-4 py-3 shadow-[0_8px_25px_rgba(154,53,80,0.08)] transition-all duration-200 focus-within:border-[#9a3550] focus-within:ring-2 focus-within:ring-[#f1d8df]">
                        <FaSearch className="mr-3 text-base text-[#9a3550]" />

                        <input
                            type="text"
                            placeholder="Search by title, author, category or ISBN..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent text-sm text-[#2f1d24] outline-none placeholder:text-[#9c7d86]"
                        />
                    </div>
                </div>

            </div>

            {filteredBooks.length === 0 ? (

                <div className="rounded-[24px] border border-dashed border-[#e6c2cc] bg-[#fffafc] py-20 text-center text-lg text-[#7a5b66]">
                    No Books Found
                </div>

            ) : (

                <>
                    {/* Books Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {currentBooks.map((book) => (

                            <BookCard
                                key={book.book_id}
                                book={book}
                            />

                        ))}

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">

                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`min-w-[96px] rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all ${
                                    currentPage === 1
                                        ? "cursor-not-allowed border-[#ead6dd] bg-[#f8eef2] text-[#b89aa6]"
                                        : "border-[#9a3550] bg-[#9a3550] text-white hover:-translate-y-0.5 hover:bg-[#7f2b45]"
                                }`}
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => (

                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                                            currentPage === index + 1
                                                ? "border-[#9a3550] bg-[#9a3550] text-white shadow-md"
                                                : "border-[#ead6dd] bg-white text-[#4a2d37] hover:border-[#9a3550] hover:text-[#9a3550]"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>

                                )
                            )}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`min-w-[96px] rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all ${
                                    currentPage === totalPages
                                        ? "cursor-not-allowed border-[#ead6dd] bg-[#f8eef2] text-[#b89aa6]"
                                        : "border-[#9a3550] bg-[#9a3550] text-white hover:-translate-y-0.5 hover:bg-[#7f2b45]"
                                }`}
                            >
                                Next
                            </button>

                        </div>

                    )}
                </>

            )}

        </div>
    );
}