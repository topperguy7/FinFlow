import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function Insights(){
  const { data } = useContext(DataContext);

  const ExpenseCategory = data.filter(item => item.category === "Expense");
  
  const categoryMap = {};

  for (let item of ExpenseCategory) {
    categoryMap[item.description] =
      (categoryMap[item.description] || 0) + item.amount;
  };

  let topDesc = "";
  let topAmount = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > topAmount) {
      topDesc = key;
      topAmount = categoryMap[key];
    }
  };

  const freqMap = {};

  data.forEach(item => {
    if (item.category === "Expense") {
      freqMap[item.description] =
        (freqMap[item.description] || 0) + 1;
    }
  });

  let frequentCategory = "";
  let maxCount = 0;

  for (let key in freqMap) {
    if (freqMap[key] > maxCount) {
      frequentCategory = key;
      maxCount = freqMap[key];
    }
  };

  const totalIncome = data
    .filter(item => item.category === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = data
    .filter(item => item.category === "Expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const dailyExpensesMap = {};

  data.forEach(item => {
    if (item.category === "Expense") {
      dailyExpensesMap[item.date] =
        (dailyExpensesMap[item.date] || 0) + item.amount;
    }
  });

  const dates = Object.keys(dailyExpensesMap).sort();

  let trendMessage = "No trend data";

  if (dates.length >= 2) {
    const last = dailyExpensesMap[dates[dates.length - 1]];
    const prev = dailyExpensesMap[dates[dates.length - 2]];

    const diff = last - prev;
    const percent = ((diff / prev) * 100).toFixed(1);

    if (diff > 0) {
      trendMessage = `Spending increased by ${percent}% compared to last transaction`;
    } else {
      trendMessage = `Spending decreased by ${Math.abs(percent)}% compared to last transaction`;
    }
  };

  let smartInsight = "";

  if (topDesc) {
    smartInsight = `You are spending the most on ${topDesc}`;
  };

  if (totalExpense > totalIncome) {
    smartInsight = "You are overspending this period ⚠️";
  } else if ((totalIncome - totalExpense) > 2000) {
    smartInsight = "Great job! You are saving well 🎉";
  }

  let bestDay = "";
  let worstDay = "";
  let minExpense = Infinity;
  let maxExpense = 0;

  for (let date in dailyExpensesMap) {
    const amount = dailyExpensesMap[date];

    if (amount > maxExpense) {
      maxExpense = amount;
      worstDay = date;
    }

    if (amount < minExpense) {
      minExpense = amount;
      bestDay = date;
    }
  };

  return (
    <>
      <div>
        <h1 className='text-2xl m-2 md:text-4xl font-bold'>Insights</h1>
      </div>

      {data.length === 0 ? 
      (
        <p>
          No data available yet — add transactions to view your insights.
        </p>
      ) : (
        <>
        <div className='flex flex-wrap justify-center mt-8 gap-4 md:gap-12'>

        <div className='card-top shadow-md p-3 rounded-md'>
          <p className="text-xs md:text-base">Top Spending Category</p>
          <h1 className="md:text-4xl py-1 font-semibold">{topDesc}</h1>
          <p className='text-xs md:text-xl font-medium'>You Spend ₹{topAmount}</p>
        </div>

        <div className='card-top shadow-md p-3 rounded-md'>
          <p className="text-xs md:text-base">Most Frequent Category</p>
          <h1 className='md:text-4xl py-1 font-semibold'>
            {frequentCategory}
          </h1>
          <p className="text-xs md:text-xl font-medium">{maxCount} Times</p>
        </div>

        <div className="card-top p-3 rounded-md shadow-md text-center">
          {totalExpense > totalIncome ? (
            <div className="flex flex-col items-center">
              <p className="text-sm md:text-2xl">⚠️Overspending by</p>
              <h1 className="text-2xl md:text-4xl mt-3 md:mt-2 font-semibold">₹{totalExpense - totalIncome}</h1>
            </div>
          ) : (
            <>
              <p className="text-xl md:text-2xl">✅Saved </p>
              <h1 className="text-2xl md:text-4xl md:mt-2 font-semibold">₹{totalIncome - totalExpense}</h1>
            </>
          )}
        </div>

      </div>

      <div className="card-bot mt-4 md:mt-10 md:text-2xl m-2 md:m-0 p-3 flex flex-col flex-wrap gap-2 md:gap-4 rounded-md shadow-md">

        <div className="p-3 rounded-2xl">
          <p className="text-sm mb-1">📈 Spending Trend</p>
          <h1 className="text-lg md:text-xl font-semibold">
            {trendMessage}
          </h1>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-2xl p-4 border border-gray-100 hover:shadow-xl transition">
          <p className="text-sm mb-1">🧠 Insight</p>
          <h1 className="text-lg md:text-xl font-semibold">
            {smartInsight}
          </h1>
        </div>

        <div className="p-3 rounded-2xl">
          <p className="text-sm mb-1">🟢 Lowest Spending Day</p>
          <h2 className="text-lg md:text-xl font-semibold">{bestDay} (₹{minExpense})</h2>
        </div>

        <div className="p-3 rounded-2xl">
          <p className="text-sm mb-1">🔴 Highest Spending Day</p>
          <h2 className="font-semibold text-lg md:text-xl">{worstDay} (₹{maxExpense})</h2>
        </div>

      </div>
      </>)}
    </>
  );
};