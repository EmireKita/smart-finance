import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <>
      {!isLogin && !showRegister && (
        <Login
          onLogin={() => setIsLogin(true)}
          onShowRegister={() => setShowRegister(true)}
        />
      )}

      {!isLogin && showRegister && (
        <Register onBackLogin={() => setShowRegister(false)} />
      )}

      {isLogin && (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile setIsLogin={setIsLogin} />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;