import appConfig from "../AppConfigurations/appConfig";

export const makeAuthenticatedRequest = async (path, method, body) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${appConfig.baseURL}${path}`, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
