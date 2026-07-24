import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function BookLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.removeItem("isAdmin");

        navigate("/admin/login");

    };

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-gray-900 text-white flex flex-col">

                <div className="text-center py-6 border-b border-gray-700">

                    <h1 className="text-2xl font-bold">
                        📚 Book Admin
                    </h1>

                </div>

                <nav className="flex-1 p-5 space-y-3">

                    <NavLink
                        to="/admin/admindashboard"
                        className={({ isActive }) =>
                            `block p-3 rounded-lg ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        ← Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/books"
                        end
                        className={({ isActive }) =>
                            `block p-3 rounded-lg ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        🏠 Book Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/books/add"
                        className={({ isActive }) =>
                            `block p-3 rounded-lg ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        ➕ Add Book
                    </NavLink>

                    <NavLink
                        to="/admin/books/view"
                        className={({ isActive }) =>
                            `block p-3 rounded-lg ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        📚 View Books
                    </NavLink>

                    <NavLink
                        to="/admin/books/category"
                        className={({ isActive }) =>
                            `block p-3 rounded-lg ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        🏷 Manage Categories
                    </NavLink>

                </nav>

                <div className="p-5 border-t border-gray-700">

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Main Content */}

            <div className="flex-1 p-8">

                <Outlet />

            </div>

        </div>

    );

}