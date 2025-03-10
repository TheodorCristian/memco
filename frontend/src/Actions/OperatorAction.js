import { MakeAuthenticatedRequest } from "../Services/APIService";

export const generateVideo = async (data) => {
   let result = await MakeAuthenticatedRequest('/operator/generate-video', "POST", data);
   return result;
}