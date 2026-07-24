import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";

    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
