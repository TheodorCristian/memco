import { makeAuthenticatedRequest } from "../Services/APIService";

export const generateVideo = async (data) => {
   let result = await makeAuthenticatedRequest('/operator/generate-video', "POST", data);
   return result;
}