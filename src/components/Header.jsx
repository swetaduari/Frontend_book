import { Link } from "react-router-dom";
import {
    FaShoppingCart,
    FaBook,
    FaBars,
    FaTimes,
    FaUserAstronaut,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header({ onToggleSidebar, isSidebarOpen }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");

        if (!userId) return;

        axios
            .get(`http://localhost:9090/users/${userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                {/* Left Side */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="rounded-xl border border-[#f1d8df] p-2 text-[#7b1e3a] transition hover:bg-[#fff5f7] lg:hidden"
                        aria-label="Toggle sidebar"
                    >
                        {isSidebarOpen ? (
                            <FaTimes size={18} />
                        ) : (
                            <FaBars size={18} />
                        )}
                    </button>

                    <Link
                        to="/home"
                        className="flex items-center gap-2 text-xl font-bold sm:text-2xl"
                    >
                        <FaBook className="text-[#7b1e3a]" />

                        <span className="bg-gradient-to-r from-[#7b1e3a] via-[#c0576b] to-[#f5afba] bg-clip-text text-transparent">
                            किताबी कीड़ा
                        </span>
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 sm:gap-5">

                    {/* Decorative Bookshelf */}
                    <img
                        src="public\images\bookshelf.png"
                        alt="Bookshelf"
                        className="hidden lg:block h-13 w-auto object-contain"
                    />

                    <Link
                        to="/books"
                        className="text-sm font-medium text-slate-700 transition hover:text-[#9a3550] sm:text-base"
                    >
                        Books
                    </Link>

                    <Link
                        to="/cart"
                        className="text-slate-700 transition hover:text-[#9a3550]"
                    >
                        <FaShoppingCart size={20} />
                    </Link>

                    <Link
                        to="/profile"
                        className="inline-flex items-center justify-center rounded-full border border-[#f1d8df] bg-gradient-to-br from-[#fff7f9] to-[#ffeef3] p-2.5 text-[#9a3550] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <FaUserAstronaut size={18} />
                    </Link>

                    <span className="whitespace-nowrap text-sm font-semibold text-gray-700 sm:text-base">
                        {user ? `${user.firstName} ${user.lastName}` : ""}
                    </span>
                </div>
            </div>
        </header>
    );
}