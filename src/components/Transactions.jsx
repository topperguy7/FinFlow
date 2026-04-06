import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

export function Transactions() {
  const { data, setData , role} = useContext(DataContext);
  const [modelOpen, setModelOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Income"
  });

  const [searchType, setSearchType] = useState("None");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now()
    };

    setData((prev) => [...prev, newItem]);

    setFormData({
      date: "",
      description: "",
      amount: "",
      category: "Income"
    });

    setModelOpen(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    if (searchType === "None" || searchValue === "") return true;

    if (searchType === "Date") {
      return item.date === searchValue;
    };

    if (searchType === "Category") {
      return item.category
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    };

    if (searchType === "Description") {
      return item.description
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    };

    if (searchType === "Amount") {
      return item.amount >= Number(searchValue);
    };

    return true;
  });

  return (
    <div className="relative text-[.7rem] md:text-[1.6rem] p-4">
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-[2.4rem] font-bold">All Transactions</h1>

        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
          {role === "Admin" && (<button
            className="border-2 p-2 bg-[var(--bg1d)] rounded-xl cursor-pointer hover:-translate-y-1 active:scale-95 shadow-lg transition"
            onClick={() => setModelOpen(true)}
          >+Add Transaction</button>)}
        </div>
      </div>

      <div className="flex mb-2 text-xs md:text-4xl items-center">

            <p className="md:text-4xl mr-2">Search</p>
            <select 
              className="bg-[var(--bg1d)] border-2 p-2 rounded-xl cursor-pointer shadow-lg"
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearchValue("");
              }}
            >
              <option value='None'>None</option>
              <option value='Date'>Date</option>
              <option value='Category'>Category</option>
              <option value='Description'>Description</option>
              <option value='Amount'>Amount</option>
            </select>

            <div className="ml-4 flex gap-2">
              {searchType !== "None" && (
                <input
                className="w-24 md:w-fit border"
                type={searchType === "Date" ? "date" : searchType === "Amount" ? "number" : "text"}
                placeholder={`Enter ${searchType}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                />
              )}

              {searchType !== "None" && (
                <button
                  onClick={() => {
                    setSearchType("None");
                    setSearchValue("");
                  }}
                  className="w-fit px-1 py-1 bg-[var(--bg1d)] border rounded-lg cursor-pointer hover:-translate-y-0.5 transition ease-in-out duration-200"
                >
                  Clear
                </button>
              )}
            </div>
      </div>

      <div className="md:p-4 rounded-md shadow-xl">
        <table className="trans-comp md:text-[1.8rem] border">
          <thead>
            <tr>
              <th className="p-2 border w-60">Date</th>
              <th className="p-2 border w-60">Description</th>
              <th className="p-2 border w-60">Category</th>
              <th className="p-2 border w-60">Amount (₹)</th>
              {role === "Admin" && (<th className="p-2 border ">Action</th>)}
            </tr>
          </thead>

          <tbody>
            {!Array.isArray(data) || filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 border">
                  No Transactions Yet / No Matching Results
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border"><span className={`${item.category === "Income" ? "text-green-700" : "text-red-400"}`}>{item.category}</span></td>
                  <td className="p-2 border">₹ {item.amount}</td>
                  {role ==="Admin" && (<td className="p-2 border">
                    <button
                    className="cursor-pointer hover:text-red-500" 
                    onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modelOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 backdrop-blur-lg shadow-xl border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Add Transaction</h2>

          <form onSubmit={handleSubmit} className=" addform flex flex-col gap-2 text-[1rem] md:text-[1.6rem]">

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="grocery"
              className="border p-2 rounded"
            />

            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="0"
              className="border p-2 rounded"
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <div className="flex justify-evenly">
              <button onClick={() => setModelOpen(false)}>Cancel</button>

              <button type="submit">Save</button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}