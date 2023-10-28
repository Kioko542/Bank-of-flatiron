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
  
    <div className=' flex  gap-5 px-4   h-full items-center m-[auto] content-center'>
      <input
      className='border-blue-700 border-2  rounded-xl shadow border-solid py-5 px-8 lg:w-[30%] my-[50px]'
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table  ">
      <table>
        <thead>
          <tr className='text-purple-500'>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        
        <tbody  className='px-3  overflow-y-scroll'>
          {transactions
            .filter((transaction) =>
              transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((transaction) => (  
              <tr className='h-full' key={transaction.id}>
                <td className='px-[12px] py-[5px]'>{transaction.date}</td>
                <td className='px-[12px] py-[5px]'>{transaction.description}</td>
                <td className='px-[12px] py-[5px]'>{transaction.category}</td>
                <td className='px-[12px] py-[5px]'>{transaction.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Home
