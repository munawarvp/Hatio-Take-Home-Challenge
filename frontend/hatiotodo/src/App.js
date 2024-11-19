import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/signup';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <div className="container">
      <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />

                <Route path="/home" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
