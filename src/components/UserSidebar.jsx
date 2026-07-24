import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaBookOpen,
  FaClipboardList,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function UserSidebar({ onNavigate = () => {} }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/books", label: "Books", icon: <FaBook /> },
    { to: "/library", label: "Library", icon: <FaBookOpen /> },
    { to: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { to: "/orders", label: "Orders", icon: <FaClipboardList /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <aside className="relative flex min-h-screen w-full flex-col overflow-hidden border-b border-[#f1d8df] bg-[linear-gradient(145deg,#fff8fa_0%,#ffffff_100%)] px-4 py-4 shadow-[0_20px_60px_rgba(123,30,58,0.08)] sm:w-72 sm:min-h-screen sm:shrink-0 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 lg:w-72">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,53,15,0.12),_transparent_45%)]" />

      <div className="relative mb-4 flex items-center gap-3 rounded-2xl border border-[#f1d8df] bg-white/80 p-3 shadow-sm backdrop-blur sm:mb-8 sm:block sm:p-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7b1e3a] to-[#a53c58] text-lg text-white shadow-lg sm:mb-3 sm:h-12 sm:w-12">
          <FaBookOpen />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">किताबी कीड़ा</h2>
          <p className="text-sm text-slate-500">Your cozy reading space</p>
        </div>
      </div>

      <nav className="relative grid gap-2 sm:flex-1 sm:grid-cols-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#7b1e3a] to-[#a53c58] text-white shadow-lg shadow-rose-200"
                  : "text-slate-700 hover:bg-[#fff5f7] hover:text-[#9a3550]"
              }`
            }
          >
            <span className="rounded-xl p-2 text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          onNavigate();
          handleLogout();
        }}
        className="relative mt-4 flex items-center justify-center gap-3 rounded-2xl border border-[#f0c7d3] bg-gradient-to-r from-[#7b1e3a] via-[#a53c58] to-[#d94868] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(155,53,80,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(155,53,80,0.35)] sm:mt-6"
      >
        <span className="rounded-xl bg-white/20 p-2">
          <FaSignOutAlt className="text-sm" />
        </span>
        <span>Logout</span>
      </button>
    </aside>
  );
}