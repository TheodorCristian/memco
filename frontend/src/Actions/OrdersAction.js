import { makeAuthenticatedRequest } from "../Services/APIService";

export const getOrders = async () => {
  // Make an authenticated request using makeAuthenticatedRequest function
  let result = await makeAuthenticatedRequest("/admin/orders", "POST", null);
  return result;
};
