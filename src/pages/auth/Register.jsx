import { useState } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate, Link } from "react-router-dom";
import { FaBookOpen, FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
    });
const [errors, setErrors] = useState({});
const [showPassword, setShowPassword] = useState(false);
   const handleChange = (e) => {

    const { name, value } = e.target;

    setUser({
        ...user,
        [name]: value
    });

    let error = "";

    switch (name) {

        case "firstName":
            if (!value.trim())
                error = "First Name is required";
            break;

        case "lastName":
            if (!value.trim())
                error = "Last Name is required";
            break;

        case "email":
            if (!value.trim()) {

                error = "Email is required";

            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {

                error = "Enter a valid email address";
            }
            break;

        case "phone":
            if (!/^[6-9]\d{9}$/.test(value)) {

                error = "Phone must contain exactly 10 digits";

            }
            break;

        case "password":
            if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value)
            ) {

                error =
                    "Password must be at least 8 characters with uppercase, lowercase, number and special character";
            }
            break;

        case "address":
            if (!value.trim())
                error = "Address is required";
            break;

        default:
            break;
    }

    setErrors({
        ...errors,
        [name]: error
    });

};
const validate = () => {

    let temp = {};

    if (!user.firstName.trim())
        temp.firstName = "First Name is required";

    if (!user.lastName.trim())
        temp.lastName = "Last Name is required";

    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
    )
        temp.email = "Enter a valid email";

    if (!/^[6-9]\d{9}$/.test(user.phone))
        temp.phone = "Phone must contain exactly 10 digits";

    if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(user.password)
    )
        temp.password =
            "Password must contain uppercase, lowercase, number & special character";

    if (!user.address.trim())
        temp.address = "Address is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;

};

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

        await registerUser(user);

        alert("Registration Successful");

        navigate("/login");

    } catch (err) {

        console.log(err);

        alert("Registration Failed");

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
                        <h1>Create your account</h1>
                        <p>Join the bookstore community and discover your next favorite read.</p>
                    </div>
                </div>

                <div className="login-card">
                    <div className="login-card-head">
                        <div className="icon-badge">
                            <FaUser />
                        </div>
                        <h2>Sign Up</h2>
                        <p>Set up your profile and start exploring our collection.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="input-group">
                            <span className="input-icon">
                                <FaUser />
                            </span>
                           <input
    type="text"
    name="firstName"
    placeholder="First Name"
    value={user.firstName}
    onChange={handleChange}
    className="auth-input"
/>

{errors.firstName && (
    <small className="text-red-500">{errors.firstName}</small>
)}
                        </label>

                        <label className="input-group">
                            <span className="input-icon">
                                <FaUser />
                            </span>
                            <input
    type="text"
    name="lastName"
    placeholder="Last Name"
    value={user.lastName}
    onChange={handleChange}
    className="auth-input"
/>

{errors.lastName && (
    <small className="text-red-500">{errors.lastName}</small>
)}
                        </label>

                        <label className="input-group">
                            <span className="input-icon">
                                <FaEnvelope />
                            </span>
                           <input
    type="email"
    name="email"
    placeholder="Email address"
    value={user.email}
    onChange={handleChange}
    className="auth-input"
/>

{errors.email && (
    <small className="text-red-500">{errors.email}</small>
)}
                        </label>

                        <label className="input-group">
                            <span className="input-icon">
                                <FaPhone />
                            </span>
                            <input
    type="text"
    maxLength={10}
    name="phone"
    placeholder="Phone"
    value={user.phone}
    onChange={handleChange}
    className="auth-input"
/>

{errors.phone && (
    <small className="text-red-500">{errors.phone}</small>
)}
                        </label>

                        <label className="input-group">
                            <span className="input-icon">
                                <FaLock />
                            </span>
                            <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={user.password}
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

{errors.password && (
    <small className="text-red-500">{errors.password}</small>
)}
                        </label>

                        <label className="input-group input-group-textarea">
                            <span className="input-icon">
                                <FaMapMarkerAlt />
                            </span>
                            <textarea
    name="address"
    placeholder="Address"
    value={user.address}
    onChange={handleChange}
    className="auth-input auth-textarea"
/>

{errors.address && (
    <small className="text-red-500">{errors.address}</small>
)}
                        </label>

                        <button type="submit" className="auth-button">
                            Create account
                            <FaArrowRight />
                        </button>
                    </form>

                    <p className="switch-link">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
