import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addFundsToWallet, getWalletBalance } from "../services/api";
import { toast } from "react-toastify";

const Wallet = () => {
  const { user, login } = useAuth();
  const [balance, setBalance] = useState(user?.walletBalance || 0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showDefaultTransactions, setShowDefaultTransactions] = useState(true);

  // Fetch current balance when component mounts
  useEffect(() => {
    const fetchBalance = async () => {
      if (user?.uid) {
        try {
          const currentBalance = await getWalletBalance(user.uid);
          setBalance(currentBalance);
          
          // Update user context with latest balance
          login({
            ...user,
            walletBalance: currentBalance
          });
        } catch (error) {
          console.error("Failed to fetch wallet balance:", error);
        }
      }
    };
    
    fetchBalance();
  }, [user?.uid]);

  const handleAddFunds = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const response = await addFundsToWallet(user.uid, amt);
      
      // Update balance state and user context
      setBalance(response.walletBalance);
      login({
        ...user,
        walletBalance: response.walletBalance
      });
      
      // Add transaction to list
      const newTransaction = { 
        type: "Wallet Recharge", 
        time: "Just now", 
        amount: amt 
      };
      
      if (showDefaultTransactions) {
        // First real transaction - replace defaults with this one
        setTransactions([newTransaction]);
        setShowDefaultTransactions(false);
      } else {
        // Add to existing transactions
        setTransactions([newTransaction, ...transactions]);
      }
      
      toast.success(`₹${amt} added to your wallet successfully!`);
      setAmount("");
    } catch (error) {
      toast.error(error.message || "Failed to add funds");
    } finally {
      setLoading(false);
    }
  };

  // Default transactions to show initially
  const defaultTransactions = [
    { type: "Wallet Recharge", time: "Today, 2:30 PM", amount: 100 },
    { type: "Order #order-2", time: "Yesterday, 1:15 PM", amount: -140 },
    { type: "Wallet Recharge", time: "2 days ago, 11:05 AM", amount: 200 },
  ];

  // Display either actual transactions or default ones
  const displayTransactions = showDefaultTransactions ? defaultTransactions : transactions;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">My Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <div className="bg-[#2c2c5b] text-white rounded-xl p-6 flex items-center gap-4 shadow-lg">
            <div className="text-5xl">💰</div>
            <div>
              <p className="text-sm text-[#a3a3b2]">Available Balance</p>
              <p className="text-3xl font-semibold">₹{balance}</p>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-[#2c2c5b] mb-4">
              Recent Transactions
            </h2>
            <ul className="space-y-4 text-[#2c2c5b]">
              {displayTransactions.map((tx, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-[#a3a3b2]">{tx.time}</p>
                  </div>
                  <span
                    className={`font-semibold ${
                      tx.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.amount >= 0 ? "+" : "-"}₹{Math.abs(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#a3a3b2] mt-4">
              Displaying last {displayTransactions.length} transactions
            </p>
          </div>
        </div>

        {/* Right Panel - Add Money */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-[#2c2c5b] mb-4">
            Add Money
          </h2>
          <p className="text-sm text-[#a3a3b2] mb-2">
            Add funds to your wallet to place orders quickly
          </p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded mb-3"
            placeholder="Enter amount"
            disabled={loading}
          />
          <div className="flex gap-2 mb-4">
            {[100, 200, 500].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className="border px-3 py-1 rounded hover:bg-[#fec723] hover:text-[#2c2c5b]"
                disabled={loading}
              >
                ₹{val}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="flex items-center gap-2 text-[#2c2c5b]">
              <input type="checkbox" defaultChecked />
              Credit / Debit Card <span className="text-sm text-[#a3a3b2]">(Default Payment Method)</span>
            </label>
          </div>
          <button
            onClick={handleAddFunds}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#fec723] hover:bg-[#ffd744]'} text-[#2c2c5b] font-semibold py-2 rounded`}
            disabled={loading}
          >
            {loading ? "Processing..." : "+ Add Funds"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
