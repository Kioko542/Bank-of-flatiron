import React, { useState, useEffect } from 'react';
import './App.css';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const sortTransactionsByAmount = () => {
    if (sortBy === 'amount') {
      setTransactions([...transactions].reverse());
    } else {
      setTransactions([...transactions].sort((a, b) => a.amount - b.amount));
    }
    setSortBy('amount');
  };

  const totalBalance = transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.amount);
  }, 0);

  return (
    <div id='all' className='flex gap-5 px-4   items-center mx-auto content-center'>
      

      

      <div className="table  " style={{ maxHeight: '900px', overflowY: 'auto' }}>
      <input
        className='border-blue-700  border-2 rounded-xl shadow border-solid py-5 px-8 lg:w-[50%] my-[50px]'
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='border-blue-700 border-2 rounded-xl mx-3 shadow border-solid  py-5 px-8 lg:w-[35%] my-[50px]'
      >
        
  <option value="">All Categories</option>
  <option value="Food">Food</option>
  <option value="Income">Income</option>
  <option value="Fashion">Fashion</option>
  <option value="Gift">Gift</option>
  <option value="Transportation">Transportation</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Housing">Housing</option>
      </select>
        <table className='h-[auto] bg-red-300'>
          <thead>
            <tr className='text-purple-700'>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th onClick={sortTransactionsByAmount} style={{ cursor: 'pointer' }}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody className=''>
            {transactions
              .filter((transaction) =>
                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === '' || transaction.category === selectedCategory)
              )
              .map((transaction) => (
                <tr className='h-full' key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>Total Balance: ${totalBalance.toFixed(2)}</div>
    </div>
  );
};

export default Home;
