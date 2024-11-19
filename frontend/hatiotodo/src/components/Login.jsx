import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/config"
import axios from "axios"
import { getLocal, setLocal } from "../utils/helper"
import { useNavigate } from "react-router-dom"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (getLocal()) {
            navigate("/home")
        }
    }, [])

    function userLogin(e) {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.success) {
                setLocal(response.data.data.user_id)
                navigate("/home")
            }
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Log In</h2>
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
                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"} // Toggle input type
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
                <button className="form-button" type="submit" onClick={userLogin}>
                    Login
                </button>
                <div className="signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </form>
        </div>
    )
}

export default Login