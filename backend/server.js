// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// let transactions = [];

// app.get("/transactions", (req, res) => {
//   res.json(transactions);
// });

// app.post("/transactions", (req, res) => {
//   const newTransaction = {
//     id: Date.now(),
//     ...req.body,
//   };

//   transactions.push(newTransaction);
//   res.json(newTransaction);
// });

// app.put("/transactions/:id", (req, res) => {
//   const id = req.params.id;

//   transactions = transactions.map((t) =>
//     String(t.id) === id ? { ...t, ...req.body } : t
//   );

//   res.json({ message: "Transaction updated" });
// });

// app.delete("/transactions/:id", (req, res) => {
//   const id = req.params.id;

//   transactions = transactions.filter((t) => String(t.id) !== id);

//   res.json({ message: "Transaction deleted" });
// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./transactions.json";

// const readTransactions = () => {
//   const data = fs.readFileSync(FILE_PATH, "utf-8");
//   return JSON.parse(data);
// };

const readTransactions = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTransactions = (transactions) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2));
};

app.get("/transactions", (req, res) => {
  const transactions = readTransactions();
  res.json(transactions);
});

app.post("/transactions", (req, res) => {
  const transactions = readTransactions();

  const newTransaction = {
    id: Date.now(),
    ...req.body,
  };

  transactions.push(newTransaction);
  saveTransactions(transactions);

  res.json(newTransaction);
});

app.put("/transactions/:id", (req, res) => {
  const id = req.params.id;

  let transactions = readTransactions();

  transactions = transactions.map((t) =>
    String(t.id) === id ? { ...t, ...req.body } : t
  );

  saveTransactions(transactions);

  res.json({ message: "Transaction updated" });
});

app.delete("/transactions/:id", (req, res) => {
  const id = req.params.id;

  let transactions = readTransactions();

  transactions = transactions.filter((t) => String(t.id) !== id);

  saveTransactions(transactions);

  res.json({ message: "Transaction deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});