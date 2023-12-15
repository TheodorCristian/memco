import React, { useEffect, useState } from "react";
import { getOrders } from "../../../Actions/OrdersAction";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setorders] = useState([]);
  const navigate = useNavigate();

  const displayOrders = async () => {
    let result = await getOrders();
    if (result.isSuccess) {
      setorders(result.data);
    } else {
      navigate(`${result.redirectPath}`);
    }
  };

  const goToOder = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  useEffect(() => {
    displayOrders();
  }, []);
  return (
    <div>
      {orders.map((order) => {
        return (
          <p
            onClick={() => {
              goToOder(order.id);
            }}
          >
            {order.data.beneficiaryName}
          </p>
        );
      })}
    </div>
  );
};

export default AdminDashboard;
