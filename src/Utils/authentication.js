import { auth } from "../Configs/firebaseConfig";
import appConfig from "../AppConfigurations/appConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Auth = {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken(true);

      const response = await fetch(`${appConfig.baseURL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return { result: response, token: token };
    } catch (error) {
      // Handle login error
      throw new Error("Login failed. " + error.message);
    }
  },

  async signup(data) {
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Add to data object the uid geenrated after the user was created at the authentication app service
      data.uid = userCredential.user.uid;

      await fetch(`${appConfig.baseURL}/auth/create-new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      return userCredential.user; // Return user object after successful signup
    } catch (error) {
      // Handle signup error
      throw new Error("Signup failed. " + error.message);
    }
  },

  async signout() {
    try {
      await signOut(auth);
      return { isSuccess: true };
      // Optionally perform any actions after sign-out (redirect, update UI, etc.)
    } catch (error) {
      // Handle signout error
      throw new Error("Signout failed. " + error.message);
    }
  },

  async getUserRoles(uid, token) {
    try {
      const userResponse = await fetch(
        `${appConfig.baseURL}/auth/get-user-roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: uid }),
        }
      );

      return { isSuccess: true, result: userResponse };
    } catch (error) {
      throw new Error("Getting error failed. " + error.message);
    }
  },

  async setupRoleClaim(role, uid) {
    console.log(role);
    console.log(uid);
    try {
      await fetch(`${appConfig.baseURL}/auth/setup-role-claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: role, uid: uid }),
      });

      return { isSuccess: true };
    } catch (error) {
      throw new Error("Getting error failed. " + error.message);
    }
  },
};

export default Auth;
