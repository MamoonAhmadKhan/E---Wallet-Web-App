import React, { useState } from 'react';

export const Balance = (props) => {
    // State to track if balance should be shown
    const [showBalance, setShowBalance] = useState(false);

    // Function to toggle balance visibility
    const handleShowBalance = () => {
        setShowBalance((prev) => !prev);
    };

    return (
        <div className="flex flex-col bg-slate-800 border-2 border-zinc-500 p-4">
            <div className="font-bold text-lg">
                <p className="p-2 text-white">Your balance:</p>
            </div>
            {showBalance && (
                <div className="font-semibold text-lg">
                    <p className="p-2 text-white">Rs {Math.floor(props.balance)}</p>
                </div>
            )}
            <button 
                onClick={handleShowBalance} 
                className="mt-4 p-2 bg-slate-200 text-black rounded"
            >
                {showBalance ? 'Hide Balance' : 'Show Balance'}
            </button>
        </div>
    );
};
