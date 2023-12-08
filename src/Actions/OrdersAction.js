import { makeAuthenticatedRequest } from "../Services/APIService";

export const getOrders = async () => {
  let result = await makeAuthenticatedRequest("/orders", "POST", null);
  return result;
};
