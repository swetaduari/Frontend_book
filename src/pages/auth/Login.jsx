import { useState } from "react";
import { loginUser } from "../../services/userService";
import { useNavigate, Link } from "react-router-dom";
import { FaBookOpen, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form.email, form.password);

            console.log("Logged In User:", res.data);

            sessionStorage.setItem("user", JSON.stringify(res.data));
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("firstName", res.data.firstName);
            sessionStorage.setItem("lastName", res.data.lastName);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("phone", res.data.phone);
            sessionStorage.setItem("address", res.data.address);

            alert("Login Successful");
            navigate("/home");
        } catch (err) {
            console.log(err);
            alert("Invalid Email or Password");
        }
    };

    return (
        <div className="login-page">
            <div className="login-shell">
                <div className="login-visual">
                    <div className="welcome-card">
                        <div className="welcome-icon">
                            <FaBookOpen />
                        </div>
                        <h1>Welcome back</h1>
                        <p>Continue your reading journey with a calm and cozy login experience.</p>
                    </div>
                </div>

                <div className="login-card">
                    <div className="login-card-head">
                        <div className="icon-badge">
                            <FaBookOpen />
                        </div>
                        <h2>Sign In</h2>
                        <p>Access your book collection and favorite reads.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="input-group">
                            <span className="input-icon">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        </label>

                        <label className="input-group">
                            <span className="input-icon">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="auth-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </label>

                        <button type="submit" className="auth-button">
                            Login
                            <FaArrowRight />
                        </button>
                    </form>

                    <p className="switch-link">
                        Don&apos;t have an account?
                        <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
