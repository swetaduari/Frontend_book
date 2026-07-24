import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import Books from "./pages/user/Books";

import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Payment from "./pages/user/Payment";
import Library from "./pages/user/Library";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Users1 from "./pages/admin/Users1";
import Orders1 from "./pages/admin/Orders1";
import Payments1 from "./pages/admin/Payments1";
import BookDashboard from "./pages/admin/BookDashboard";
import ViewBooks from "./pages/admin/ViewBooks";

import AddBook from "./pages/admin/AddBook";
import ManageCategories from "./pages/admin/ManageCategories";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Payment />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

    <Route
          path="/admin/admindashboard"
           element={
                    sessionStorage.getItem("isAdmin") === "true"
                  ? <AdminDashboard />
                  : <Navigate to="/admin/login" replace />
                    }
/>
<Route path="/admin/users1" element={<Users1 />} />
<Route path="/admin/orders1" element={<Orders1 />} />
<Route path="/admin/payments1" element={<Payments1 />} />
<Route path="/admin/BookDashboard" element={<BookDashboard />} />
    <Route path="/admin/books/view" element={<ViewBooks />} />
    <Route path="/admin/books/add" element={<AddBook />} />
    <Route path="/admin/categories" element={<ManageCategories />} />

        {/* Invalid URL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
