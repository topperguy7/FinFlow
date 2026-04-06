import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UIContext } from '../context/UIContext';

import { Chart } from 'chart.js/auto';
import { Bar , Pie , Line} from 'react-chartjs-2';

export function Dashboard(){
  const { data } = useContext(DataContext);
  const { setPage } = useContext(UIContext);

  const netBalance = data.reduce((total, item) => {
    if(item.category === "Income"){
      return total + item.amount;
    }
    else{
      return total - item.amount;
    }
  }, 0);

  const Income = data.reduce((total, item) => {
    return item.category === "Income" ? total + item.amount : total;
  }, 0)

  const Expense = data.reduce((total, item) => {
    return item.category === "Expense" ? total + item.amount : total
  }, 0)

  const SavingsPercentage = Income === 0 ? 0 : (((Income - Expense) / Income) * 100).toFixed(2);

  const categoryTotals = data.reduce((acc, item) => {
    if (!acc[item.description]) {
      acc[item.description] = 0;
    }
    acc[item.description] += item.amount;
    return acc;
  }, {});

  const groupedByDate = {};

    data.forEach((item) => {
      const { date, category, amount } = item;

      if (!groupedByDate[date]) {
        groupedByDate[date] = { income: 0, expense: 0 };
      }

      if (category === "Income") {
        groupedByDate[date].income += amount;
      } else {
        groupedByDate[date].expense += amount;
      }
    });

    const sortedDates = Object.keys(groupedByDate).sort();

  return(
    <>
      <div>
        <h1 className='text-2xl m-2 md:text-4xl font-bold'>Overview</h1>
      </div>

      {data.length === 0 ? 
      (
        <div className='flex flex-col items-center p-3'>
        <p>
          Your dashboard is empty — start adding transactions to see insights.
        </p>

        <button
          className='bg-[var(--btn)] px-3 py-2 mt-2 md:mt-4 rounded-xl shadow-2xl hover:-translate-y-1 transition ease-in-out duration-200 text-2xl cursor-pointer' 
          onClick={() => setPage("Transactions")}>
          Transactions ⮞</button>
        </div>
      ) : (
      <>
      <div className='flex flex-wrap justify-center mt-8 gap-12'>

        <div className='card-top shadow-xl p-3 rounded-md'>
          <p>Net Balance</p>
          <h1 className='md:text-4xl font-medium'>₹{netBalance}</h1>
        </div>

        <div className='card-top shadow-xl p-3 rounded-md'>
          <p>Total Income</p>
          <h1 className='md:text-4xl font-medium'>₹{Income}</h1>
        </div>

        <div className='card-top shadow-xl p-3 rounded-md'>
          <p>Total Expense</p>
          <h1 className='md:text-4xl font-medium'>₹{Expense}</h1>
        </div>

        <div className='card-top shadow-xl p-3 rounded-md'>
          <p>Savings rate</p>
          <h1 className='md:text-4xl font-medium'>{SavingsPercentage}%</h1>
        </div>

      </div>

      <div className='card-bot grid md:grid-cols-2 gap-4 p-4 justify-center rounded-md shadow-xl'>

        <div className='p-2 h-60 w-70 md:h-80 md:w-120 rounded-md'>
          <Bar
          data={{
            labels: ["Income", "Expense"],
            datasets: [
              {
                label: "Amount",
                data: [Income, Expense],
                backgroundColor: ["#3b8c59", "#8e3434"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Financial Overview",
                font: {
                  size: 28,
                },
              },
              legend: {
                position: "top",
              },
            },
          }}
          />
        </div>

        <div className='p-2 h-60 w-70 md:h-80 md:w-120 rounded-md flex justify-center'>
          <Pie 
          data={{
            labels: Object.keys(categoryTotals),
            datasets: [
              {
                data: Object.values(categoryTotals),
                backgroundColor: [
                  "#22c55e",
                  "#ef4444",
                  "#3b82f6",
                  "#f59e0b",
                  "#a855f7",
                ],
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              title: {
                display: true,
                text: "Category Breakdown",
                font: {
                  size: 20,
                },
              },

              legend: {
                position: "right", // 👈 moves stats to right
                labels: {
                  padding: 20,
                  font: {
                    size: 14,
                  },
                },
              },
            },
          }}/>
        </div>

        <div className='md:col-span-2 p-2 h-60 md:w-full w-70 rounded-md'>
          <Line
          data = {{
            labels: sortedDates,
            datasets: [
              {
                label: "Income",
                data: sortedDates.map((d) => groupedByDate[d].income),
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Expense",
                data: sortedDates.map((d) => groupedByDate[d].expense),
                borderColor: "#ef4444",
                backgroundColor: "#ef4444",
                tension: 0.4,
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              title: {
                display: true,
                text: "Income vs Expense Over Time",
                font: { size: 18 },
              },
              legend: {
                position: "top",
              },
            },

            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Amount (₹)",
                },
              },
            },
          }}
          />
        </div>
    
      </div>
      </>)}
    </>
  );
};