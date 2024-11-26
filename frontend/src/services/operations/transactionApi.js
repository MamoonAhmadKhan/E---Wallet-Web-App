import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBalance = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/account/balance`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      return response.data.balance;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Getbalance error...", error.message);
  }
};

export const sendMoney = async (amount, to, token) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/account/transfer`,
      { amount, to },
      { Authorization: `Bearer ${token}` }
    );
    if (response.status !== 200) {
      throw new Error(response.data.message);
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("Send money error...", error.message);
  }
};

// src/services/operations/transactionApi.js
export const getTransactionHistory = async (token) => {
  try {
    const response = await apiConnector(
      'GET',
      `${BASE_URL}/account/transactions`,
      null, // Body should be null for GET requests
      { Authorization: `Bearer ${token}` } // Headers should be passed here
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch transaction history');
    }
    return response.data; // Assuming the API returns an array of transactions
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};