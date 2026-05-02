import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/transactions.css";
import { useFinance } from "../context/FinanceContext";

function Transactions() {
  const { transactions, setTransactions } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "makanan",
  });

  const [customCategory, setCustomCategory] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "makanan",
    });
    setCustomCategory("");
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      ...form,
      category: form.category === "lainnya" ? customCategory : form.category,
    };

    if (editId) {
      fetch(`http://localhost:5000/transactions/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }).then(() => {
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === editId ? { ...t, ...transactionData } : t
          )
        );
        resetForm();
      });
    } else {
      fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      })
        .then((res) => res.json())
        .then((savedTransaction) => {
          setTransactions((prev) => [...prev, savedTransaction]);
          resetForm();
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleEdit = (transaction) => {
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    });

    setEditId(transaction.id);
  };

  return (
    <div>
      <Navbar />

      <div className="transactions">
        <h2>Transactions</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="title"
            placeholder="Nama transaksi"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Jumlah"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Pengeluaran</option>
            <option value="income">Pemasukan</option>
          </select>

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="makanan">Makanan</option>
            <option value="transport">Transportasi</option>
            <option value="hiburan">Hiburan</option>
            <option value="lainnya">Lainnya</option>
          </select>

          {form.category === "lainnya" && (
            <input
              type="text"
              placeholder="Masukkan kategori"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required={form.category === "lainnya"}
            />
          )}

          <button type="submit">
            {editId ? "Update" : "Tambah"}
          </button>
        </form>

        <div className="list">
          {transactions.map((t) => (
            <div key={t.id} className="item">
              <span>{t.title}</span>
              <span>Rp {t.amount}</span>
              {/* <span>{t.type}</span> */}
              <span>
                {t.type === "expense" ? "Pengeluaran" : "Pemasukan"}
              </span>
              <span>{t.category}</span>

              <button onClick={() => handleEdit(t)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;