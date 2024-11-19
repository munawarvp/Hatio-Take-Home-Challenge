import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom"; 

function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const userRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axios.post(`${BASE_URL}/register`, {
            username: username,
            email: email,
            password: password
        }).then((response) => {
            if (response.data.success) {
                navigate("/login")
            }
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Sign Up</h2>
            <form className="form-group">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-input"
                        placeholder="Enter your username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="username">Email</label>
                    <input
                        id="email"
                        type="text"
                        className="form-input"
                        placeholder="Enter your email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        placeholder="Enter your password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="password-container">
                        <input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"} // Toggle input type
                            className="form-input"
                            placeholder="Confirm password"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "🙈" : "👁️"} {/* Eye icon */}
                        </button>
                    </div>
                </div>
                <button className="form-button" type="submit" onClick={userRegister}>
                    Sign Up
                </button>
                <div className="signup-link">
                    Already have an account? <a href="/">Log In</a>
                </div>
            </form>
        </div>
    )
}

export default SignUp