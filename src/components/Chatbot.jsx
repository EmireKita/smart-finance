import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "../styles/chatbot.css";

function Chatbot() {
  const { transactions } = useFinance();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ sender: "bot", text: "Halo! Saya Smart Finance Bot 👋" }]);

  const getBotReply = (text) => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    const lowerText = text.toLowerCase();

    if (lowerText.includes("saldo")) {
      return `Saldo kamu saat ini Rp ${balance}`;
    }

    if (lowerText.includes("pengeluaran")) {
      return `Total pengeluaran kamu Rp ${expense}`;
    }

    if (lowerText.includes("pemasukan")) {
      return `Total pemasukan kamu Rp ${income}`;
    }

    if (lowerText.includes("boros dimana")) {
      const expenses = transactions.filter((t) => t.type === "expense");

      if (expenses.length === 0) {
        return "Belum ada data pengeluaran untuk dianalisis.";
      }

      const categoryTotals = {};

      expenses.forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
      });

      const biggestCategory = Object.keys(categoryTotals).reduce((a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b));

      const relatedTransactions = expenses
        .filter((t) => t.category === biggestCategory)
        .map((t) => t.title)
        .slice(0, 3);

      return `Kamu paling banyak menghabiskan uang di kategori ${biggestCategory}, seperti: ${relatedTransactions.join(", ")}.`;
    }

    if (lowerText.includes("boros")) {
      if (income === 0) {
        return "Belum ada pemasukan tercatat, jadi saya belum bisa menganalisis kondisi keuanganmu.";
      }

      const ratio = expense / income;
      const percentage = (ratio * 100).toFixed(0);

      if (ratio < 0.7) {
        return `Pengeluaran kamu baru ${percentage}% dari pemasukan. Kondisi keuanganmu masih aman.`;
      }

      if (ratio <= 1) {
        return `Pengeluaran kamu sudah mencapai ${percentage}% dari pemasukan. Kamu perlu mulai mengontrol pengeluaran agar tidak boros.`;
      }

      const deficit = expense - income;

      return `Ya, pengeluaran kamu mencapai ${percentage}% dari pemasukan. Saat ini kamu defisit Rp ${deficit}, jadi kondisi keuanganmu tergolong boros.`;
    }

    if (lowerText.includes("tips")) {
      if (transactions.length === 0) {
        return "Belum ada data transaksi. Mulailah mencatat pemasukan dan pengeluaran agar saya bisa memberi tips.";
      }

      const categoryTotals = {};

      transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
        });

      const biggestCategory = Object.keys(categoryTotals).reduce((a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b));

      if (expense > income) {
        return `Pengeluaran kamu lebih besar dari pemasukan. Pengeluaran terbesar ada di kategori ${biggestCategory}. Tips: kurangi pengeluaran di kategori tersebut dan buat batas anggaran mingguan.`;
      } else {
        return `Keuangan kamu cukup stabil. Pengeluaran terbesar ada di kategori ${biggestCategory}. Tips: pertahankan pola ini dan sisihkan minimal 20% pemasukan untuk tabungan.`;
      }
    }

    return "Maaf, saya belum mengerti pertanyaan itu.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chat-box">
          <h3>Smart Finance Bot</h3>

          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Tanya sesuatu..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
