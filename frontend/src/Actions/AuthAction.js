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

    if (!userResponse.isSuccess) {
      throw new Error("Failed to retrieve user roles");
    }

    const userData = await userResponse.result.json();

    return { data: data, token: response.token, userData: userData.result };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const signup = async (data) => {
  try {
    const response = await Auth.signup(data);
    if (response.uid) {
      const setupRoleClaimResponse = await Auth.setupRoleClaim(
        data.role,
        response.uid
      );
      if (!setupRoleClaimResponse.isSuccess) {
        throw new Error("Failed to setup role cookie");
      }
      return response.uid;
    } else {
      throw new Error("Failed to sign up");
    }
  } catch (error) {
    throw new Error(`Signup failed: ${error.message}`);
  }
};

export const signout = async () => {
  try {
    return await Auth.signout();
  } catch (error) {
    throw new Error(`Signout failed: ${error.message}`);
  }
};

export const verifyToken = async () => {
  try {
    return await Auth.verifyToken();
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};
