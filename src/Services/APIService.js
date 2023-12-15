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
      credentials: "include",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${appConfig.baseURL}${path}`, options);
    const data = await response.json();

    switch (response.status) {
      case 200:
        return {
          isSuccess: true,
          data: data.data,
        };

      case 401:
        return {
          isSuccess: false,
          redirectPath: "/session-expired",
        };

      case 403:
        return {
          isSuccess: false,
          redirectPath: "/forbidden",
        };

      case 404:
        return {
          isSuccess: false,
          redirectPath: "/session-expired",
        };

      case 500:
        throw new Error("Data not found");
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
