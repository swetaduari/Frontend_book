import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBookCount } from "../../services/bookService";
import { getUserCount } from "../../services/userService";
import { getOrderCount } from "../../services/orderService";
import { getPaymentCount } from "../../services/payementService";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const adminName = "Sweta";

    const [counts, setCounts] = useState({
        books: 0,
        users: 0,
        orders: 0,
        payments: 0
    });

    const statCards = [
        {
            title: "Books",
            value: counts.books,
            icon: "📚",
            accent: "from-sky-500 to-blue-600",
            textColor: "text-sky-600"
        },
        {
            title: "Users",
            value: counts.users,
            icon: "👥",
            accent: "from-emerald-500 to-green-600",
            textColor: "text-emerald-600"
        },
        {
            title: "Orders",
            value: counts.orders,
            icon: "📦",
            accent: "from-amber-500 to-orange-500",
            textColor: "text-amber-600"
        },
        {
            title: "Payments",
            value: counts.payments,
            icon: "💳",
            accent: "from-rose-500 to-red-600",
            textColor: "text-rose-600"
        }
    ];

    const quickActions = [
        {
            title: "Manage Books",
            icon: "📚",
            path: "/admin/BookDashboard",
            color: "from-sky-600 to-blue-700"
        },
        {
            title: "View Users",
            icon: "👥",
            path: "/admin/users1",
            color: "from-emerald-600 to-green-700"
        },
        {
            title: "View Orders",
            icon: "📦",
            path: "/admin/orders1",
            color: "from-amber-500 to-orange-600"
        },
        {
            title: "View Payments",
            icon: "💳",
            path: "/admin/payments1",
            color: "from-rose-600 to-red-700"
        }
    ];

    useEffect(() => {
        loadCounts();
    }, []);

    const loadCounts = async () => {

        try {

            const [
                books,
                users,
                orders,
                payments
            ] = await Promise.all([
                getBookCount(),
                getUserCount(),
                getOrderCount(),
                getPaymentCount()
            ]);

            setCounts({
                books: books.data,
                users: users.data,
                orders: orders.data,
                payments: payments.data
            });

        } catch (err) {

            console.log(err);

        }

    };

    const handleLogout = () => {
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("adminEmail");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 shadow-[0_25px_60px_rgba(15,23,42,0.10)] backdrop-blur">
                    <div className="relative bg-gradient-to-r from-slate-900 via-sky-900 to-blue-700 p-6 sm:p-8 lg:p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-100">
                                    Admin overview
                                </p>
                                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                                    Welcome back, {adminName} 👋
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100 sm:text-base">
                                    Manage your bookstore operations smoothly with a modern control center for books, users, orders, and payments.
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card, index) => (
                        <div
                            key={card.title}
                            className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
                        >
                            <div className={`inline-flex rounded-2xl bg-gradient-to-r ${card.accent} px-3 py-2 text-2xl text-white`}>
                                {card.icon}
                            </div>
                            <p className="mt-4 text-sm font-medium text-slate-500">{card.title}</p>
                            <h3 className={`mt-2 text-4xl font-bold ${card.textColor}`}>{counts[card.title.toLowerCase()]}</h3>
                            <div className="mt-4 h-2 rounded-full bg-slate-100">
                                <div className={`h-2 rounded-full bg-gradient-to-r ${card.accent} transition-all duration-500 group-hover:w-full`} style={{ width: `${Math.min((counts[card.title.toLowerCase()] / 100) * 100, 100)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:p-6">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
                            <p className="text-sm text-slate-500">Jump straight into the most common admin tasks.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                to={action.path}
                                className={`group relative overflow-hidden rounded-[22px] bg-gradient-to-br ${action.color} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_35%)]" />
                                <div className="relative">
                                    <div className="text-3xl">{action.icon}</div>
                                    <h3 className="mt-4 text-xl font-semibold">{action.title}</h3>
                                    <p className="mt-2 text-sm text-white/80">Open the panel and continue managing your content.</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center text-sm text-slate-500">
                    © 2026 किताबी कीड़ा Admin Panel
                </div>
            </div>
        </div>
    );

}