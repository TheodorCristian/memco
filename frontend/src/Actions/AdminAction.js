import { MakeAuthenticatedRequest } from "../Services/APIService";

export const generateQRCodes = async (data) => {
   let result = await MakeAuthenticatedRequest('/admin/generate-qr-codes', "POST", data);
   return result;
}