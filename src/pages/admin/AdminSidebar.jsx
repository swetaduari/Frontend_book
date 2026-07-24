import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/admin/login");
    };

    const navItems = [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/books", label: "Manage Books" },
        { to: "/admin/categories", label: "Categories" },
        { to: "/admin/users", label: "Users" },
        { to: "/admin/orders", label: "Orders" },
        { to: "/admin/payments", label: "Payments" },
    ];

    return (
        <div className="flex min-h-screen w-64 shrink-0 flex-col overflow-hidden bg-[linear-gradient(145deg,#111827_0%,#1f2937_100%)] px-4 py-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                <h1 className="text-2xl font-bold">किताबी कीड़ा</h1>
                <p className="mt-1 text-sm text-slate-300">Admin Panel</p>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-gradient-to-r from-[#7b1e3a] to-[#a53c58] text-white shadow-lg"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="mt-auto rounded-2xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
}