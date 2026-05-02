import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "../styles/dashboard.css";
import { useFinance } from "../context/FinanceContext";
import FinanceChart from "../components/FinanceChart";
import Chatbot from "../components/Chatbot";

function Dashboard() {
  const { transactions } = useFinance();

  const [usdRate, setUsdRate] = useState(0);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setUsdRate(data.rates.IDR);
      })
      .catch((err) => console.log(err));
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  const balanceUSD = usdRate ? (balance / usdRate).toFixed(2) : 0;

  return (
    <div>
      <Navbar />

      <div className="dashboard">
        <h2>Dashboard</h2>

        <div className="card-container">
          <Card title="Saldo" value={`Rp ${balance}`} />
          <Card title="Pengeluaran" value={`Rp ${expense}`} />
          <Card title="Pemasukan" value={`Rp ${income}`} />
          <Card title="Kurs USD" value={`Rp ${usdRate}`} />
          <Card title="Saldo USD" value={`$ ${balanceUSD}`} />
        </div>

        <div className="chart-container">
          <FinanceChart transactions={transactions} />
        </div>
      </div>

      <Chatbot />
    </div>
  );
}

export default Dashboard;