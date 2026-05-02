import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/goals.css";
import { useFinance } from "../context/FinanceContext";

function Goals() {
  const { goals, setGoals } = useFinance();
  const [form, setForm] = useState({
    name: "",
    target: "",
    saved: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Date.now(),
      ...form,
    };

    setGoals([...goals, newGoal]);

    setForm({
      name: "",
      target: "",
      saved: "",
    });
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddSaving = (id, amount) => {
    const updatedGoals = goals.map((g) => {
      if (g.id === id) {
        return {
          ...g,
          saved: Number(g.saved) + Number(amount),
        };
      }
      return g;
    });

    setGoals(updatedGoals);
  };

  return (
    <div>
      <Navbar />

      <div className="goals">
        <h2>Financial Goals</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="name" placeholder="Nama tujuan" value={form.name} onChange={handleChange} required />

          <input type="number" name="target" placeholder="Target (Rp)" value={form.target} onChange={handleChange} required />

          <input type="number" name="saved" placeholder="Tabungan sekarang" value={form.saved} onChange={handleChange} required />

          <button type="submit">Tambah Goal</button>
        </form>

        {/* LIST */}
        <div className="goal-list">
          {goals.map((g) => {
            const progress = Math.min((g.saved / g.target) * 100, 100);

            return (
              <div key={g.id} className="goal-item">
                <h3>{g.name}</h3>
                <p>
                  Rp {g.saved} / Rp {g.target}
                </p>

                {/* PROGRESS BAR */}
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>

                {/* TAMBAH TABUNGAN */}
                <div className="saving-input">
                  <input type="number" placeholder="Tambah tabungan" id={`input-${g.id}`} />

                  <button
                    onClick={() => {
                      const input = document.getElementById(`input-${g.id}`);
                      handleAddSaving(g.id, input.value);
                      input.value = "";
                    }}
                  >
                    Simpan
                  </button>
                </div>

                {/* BUTTON */}
                <div className="goal-actions">
                  <button onClick={() => handleDelete(g.id)}>Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Goals;
