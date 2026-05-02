import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {

  // 🔥 AMBIL DARI LOCAL STORAGE
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  const [goals, setGoals] = useState(() => {
    const data = localStorage.getItem("goals");
    return data ? JSON.parse(data) : [];
  });

  // 💾 SIMPAN KE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      setTransactions,
      goals,
      setGoals
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}