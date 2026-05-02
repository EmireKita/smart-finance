import Navbar from "../components/Navbar";
import "../styles/profile.css";
import { useFinance } from "../context/FinanceContext";

function Profile({ setIsLogin }) {
  const { transactions } = useFinance();

  const user = JSON.parse(localStorage.getItem("userAccount"));

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalTransactions = transactions.length;

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return (
    <div>
      <Navbar />

      <div className="profile-page">
        <h2>Profile</h2>

        <div className="profile-card">
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Total Transaksi:</strong> {totalTransactions}</p>
          <p><strong>Total Pemasukan:</strong> Rp {income}</p>
          <p><strong>Total Pengeluaran:</strong> Rp {expense}</p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
