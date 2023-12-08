import React, { useState, useEffect } from "react";
import { getOrders } from "../../../Actions/OrdersAction";
import "./Orders.scss";

const Orders = () => {
  let [orders, setOrders] = useState([]);

  const handleDisplay = async (e) => {
    e.preventDefault();
    await getAllOrders();
  };

  const getAllOrders = async () => {
    try {
      const ordersData = await getOrders();
      console.log(ordersData.data);

      setOrders(ordersData.data);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };
  useEffect(() => {}, [setOrders]);

  return (
    <div className="App">
      <button onClick={handleDisplay}>Display Orders</button>
      {orders.map((order) => {
        console.log(order)
        return (
          <div key={order.id}>
            <p>{order.data.beneficiaryName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
