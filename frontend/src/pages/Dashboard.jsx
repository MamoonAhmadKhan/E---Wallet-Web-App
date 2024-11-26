import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useRecoilValue, RecoilRoot, useSetRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { getBalance, getTransactionHistory } from "../services/operations/transactionApi";
import { Users } from "../components/Users";
import { getCurrentUser } from "../services/operations/userApi";
import TransactionHistory from "../components/TransactionHistory";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]); // State for transaction history
  const token = useRecoilValue(tokenAtom);
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUser(token);
      if (userData) {
        setUser(userData);
      }
    };

    fetchUserData();
  }, [token, setUser]);


  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await getBalance(token);
      setBalance(userBalance);
    };
    fetchBalance();
  }, [token]);

    const fetchTransactionHistory = async () => {
      try {
        const history = await getTransactionHistory(token);
        console.log("Fetched transaction history:", history); // Log the fetched history
        setTransactionHistory(history);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };
    useEffect(() => {
    fetchTransactionHistory();
  }, [token]);

  return (
    <>
    <div className="bg-slate-800">
      <Appbar user={user.firstName} />
      <div>
        <Users />
      </div>
      <Balance balance={balance} />
      <TransactionHistory history={transactionHistory} /> {/* Render the TransactionHistory component */}
    </div>
    </>
  );
};

export default Dashboard;
