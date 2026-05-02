import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function FinanceChart({ transactions }) {
  const dataMap = {};

  transactions.forEach((t) => {
    if (!dataMap[t.category]) {
      dataMap[t.category] = {
        category: t.category,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") {
      dataMap[t.category].income += Number(t.amount);
    } else {
      dataMap[t.category].expense += Number(t.amount);
    }
  });

  const data = Object.values(dataMap);

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey="income" fill="#22c55e" />
      <Bar dataKey="expense" fill="#ef4444" /> */}
      <Bar dataKey="income" name="Pemasukan" fill="#22c55e" />
      <Bar dataKey="expense" name="Pengeluaran" fill="#ef4444" />
    </BarChart>
  );
}

export default FinanceChart;