import React from "react";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";
import useTrade from "../../../hooks/useTrade";

const WalletBalance = () => {
  const { userEmail } = useUser();
  const [users, refetch, isPending] = useUsers();
  const normalUsers = users?.find((user) => user?.email === userEmail) || [];
  console.log(normalUsers._id);

  const [treads] = useTrade();

  return <div className="text-white  ">{/* <h1>Wallet Balance</h1> */}</div>;
};

export default WalletBalance;
