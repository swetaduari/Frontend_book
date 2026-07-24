import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserSidebar from "../components/UserSidebar";

export default function UserLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Header
                onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                isSidebarOpen={isSidebarOpen}
            />

            <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
                <div
                    className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                <div
                    className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] transition-transform duration-300 lg:static lg:w-auto lg:translate-x-0 ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <UserSidebar onNavigate={() => setIsSidebarOpen(false)} />
                </div>

                <main className="flex-1 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </>
    );
}