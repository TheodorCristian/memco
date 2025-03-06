import { makeAuthenticatedRequest } from "../Services/APIService";

export const generateQRCodes = async (data) => {
   let result = await makeAuthenticatedRequest('/admin/generate-qr-codes', "POST", data);
   return result;
}