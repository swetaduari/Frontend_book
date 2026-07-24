import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            form.email === "swetaduari123@gmail.com" &&
            form.password === "newpassword123"
        ) {
            sessionStorage.setItem("isAdmin", "true");
            sessionStorage.setItem("adminEmail", form.email);

            alert("Welcome Admin!");
            navigate("/admin/admindashboard");
        } else {
            alert("You are not the Admin!");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_45%,_#fdfefe_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)]">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative flex flex-col justify-between bg-gradient-to-br from-slate-900 via-sky-900 to-blue-700 p-8 text-white sm:p-10">
                        <div>
                            <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                                Secure admin access
                            </div>
                            <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">
                                Manage your bookstore with ease
                            </h2>
                            <p className="max-w-md text-sm leading-6 text-sky-100 sm:text-base">
                                Keep books, orders, and users organized from one simple dashboard.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                                    📚
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Fast admin control</p>
                                    <p className="text-sm text-sky-100">
                                        Update inventory and track activity in seconds.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10 lg:p-12">
                        <div className="mb-6">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
                                Welcome back
                            </p>
                            <h3 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                Admin Login
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 sm:text-base">
                                Sign in to continue managing your library.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Admin Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-100"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            <Link to="/login" className="font-medium text-sky-700 hover:underline">
                                Back to User Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
