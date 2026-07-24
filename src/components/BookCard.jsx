import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../services/cartService";

export default function BookCard({ book }) {

    const handleAddToCart = async () => {
        try {

            const userId = sessionStorage.getItem("userId");

            await addToCart(userId, book.book_id, 1);

            alert("Book Added To Cart");

        } catch (err) {

            console.log(err);

            alert("Unable to Add Book");

        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#f1d8df] bg-white shadow-[0_16px_40px_rgba(123,30,58,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(123,30,58,0.14)]">
            <div className="relative overflow-hidden">
                <img
                      src={`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/books/image/${book.book_id}`}
    alt={book.title}
                    className="h-60 w-full object-cover transition duration-500 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                    }}
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a3550] shadow-sm">
                    {book.category?.categoryName || "Classic"}
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <h2 className="text-lg font-bold text-[#2f1d24] line-clamp-1">
                    {book.title}
                </h2>
                <p className="mt-1 text-sm text-[#7a5b66]">{book.author}</p>
                <p className="mt-3 flex-grow text-sm leading-6 text-[#5d4a53] line-clamp-3">
                    {book.description}
                </p>

                <div className="mt-4">
                    <h3 className="text-2xl font-bold text-[#7b1e3a]">₹ {book.price}</h3>
                    <p className="mt-1 text-sm font-medium text-[#6e8f63]">
                        {book.quantity} in stock
                    </p>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7b1e3a] py-3 font-semibold text-white transition hover:bg-[#9a3550]"
                >
                    <FaShoppingCart />
                    Add To Cart
                </button>
            </div>
        </div>
    );

}