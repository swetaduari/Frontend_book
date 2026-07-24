import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return children;
}