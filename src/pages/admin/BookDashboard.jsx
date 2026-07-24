import { useNavigate } from "react-router-dom";

export default function BookDashboard() {

    const navigate = useNavigate();

    const cards = [
        {
            title: "Add Book",
            description: "Add a new book to your store.",
            icon: "➕",
            path: "/admin/books/add",
            accent: "from-sky-500 to-blue-600"
        },
        {
            title: "View Books",
            description: "Edit and delete existing books.",
            icon: "📚",
            path: "/admin/books/view",
            accent: "from-violet-500 to-purple-600"
        },
        {
            title: "Manage Categories",
            description: "Add, view and delete book categories.",
            icon: "🏷️",
            path: "/admin/categories",
            accent: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <button
                    onClick={() => navigate("/admin/AdminDashboard")}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    ← Back to Dashboard
                </button>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-blue-700 p-6 sm:p-8">
                        <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-100">
                            Book management
                        </p>
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            📚 Book Management
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100 sm:text-base">
                            Organize your catalog and keep categories updated from one streamlined workspace.
                        </p>
                    </div>

                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3 lg:p-8">
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                onClick={() => navigate(card.path)}
                                className="group cursor-pointer rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
                            >
                                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${card.accent} px-3 py-2 text-3xl text-white`}>
                                    {card.icon}
                                </div>
                                <h2 className="mt-5 text-2xl font-bold text-slate-800">{card.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                                <div className="mt-5 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:translate-x-1">
                                    Open panel →
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}