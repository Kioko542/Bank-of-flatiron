import React, { useState, useEffect } from 'react';
import './App.css';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
  
    <div className=' flex flex-col  items-center mx-3 '>
      <input
      className='border py-5 px-8 lg:w-[40%] my-[50px] shadow-lg rounded-lg'
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table ">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
          <hr />
        </thead>
        
        <tbody  className='px-3 overflow-scroll'>
          {transactions
            .filter((transaction) =>
              transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((transaction) => (
              <tr key={transaction.id}>
                <td className='p-3'>{transaction.date}</td>
                <td className='p-3'>{transaction.description}</td>
                <td className='p-3'>{transaction.category}</td>
                <td className='p-3'>{transaction.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Home
