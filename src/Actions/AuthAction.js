import Auth from "../Utils/authentication";

export const login = async (email, password) => {
  try {
    const response = await Auth.login(email, password);

    const data = await response.result.json();

    if (!response.result.ok) {
      throw new Error("Failed to sign in");
    }

    const userResponse = await Auth.getUserRoles(
      data.tokenResult.uid,
      response.token
    );

    console.log(userResponse);
    const userData = await userResponse.result.json();
    console.log(userData);
    if (!userResponse.isSuccess) {
      throw new Error("Failed to retrieve user roles");
    }

    return { data: data, token: response.token, userData: userData.result };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signup = async (data) => {
  try {
    const response = await Auth.signup(data);
    if (response.uid) {
      return response.uid; // Modify this according to your backend response structure
    } else {
      throw new Error("Failed to sign up");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signout = async () => {
  try {
    // Perform signout actions, clear user data, etc.
    const response = await Auth.signout(); // Implement signout method in your Auth utility
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
