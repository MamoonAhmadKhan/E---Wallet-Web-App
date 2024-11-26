// src/components/TransactionHistory.js
import React from 'react';
import { useState } from 'react';

const TransactionHistory = ({ history }) => {
  console.log("Transaction History:", history);
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility of transaction history
  
    const toggleVisibility = () => {
      setIsVisible(!isVisible); // Toggle the visibility state
    };
  
  return (
    <div className="flex flex-col bg-slate-800 border-2 border-zinc-500 p-4 transaction-history">
      <h2 className="ml-1 p-2 text-white font-bold text-lg">Transaction History :</h2>

      <button 
        onClick={toggleVisibility} 
        className="mt-4 p-2 bg-slate-200 text-black rounded"
      >
        {isVisible ? 'Hide History' : 'Show History'}
      </button>
      {isVisible && ( // Conditionally render the history based on visibility state

      <ul className="bg-gray-700 p-4 rounded">
      {Array.isArray(history) && history.length === 0 ? (
  <li className="text-gray-400">No transactions available.</li>
) : (
          history.map((transaction, index) => (
            <li key={index} className="text-white">
              <div>
                <strong>Amount:</strong> {transaction.amount} 
                <strong> Date:</strong> {new Date(transaction.date).toLocaleString()}
                <strong> Description:</strong> {transaction.description}
              </div>
            </li>
          ))
        )}
      </ul>
      )}
    </div>
  );
};

export default TransactionHistory;