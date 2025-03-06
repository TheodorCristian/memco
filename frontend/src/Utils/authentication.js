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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(true);

      const response = await fetch(`${appConfig.baseURL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to verify token.");
      }

      return { result: response, token: token };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  async signup(data) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      data.uid = userCredential.user.uid;

      const response = await fetch(`${appConfig.baseURL}/auth/create-new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new user.");
      }

      return userCredential.user;
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  },

  async signout() {
    try {
      await signOut(auth);
      return { isSuccess: true };
    } catch (error) {
      throw new Error(`Signout failed: ${error.message}`);
    }
  },

  async getUserRoles(uid, token) {
    try {
      const response = await fetch(`${appConfig.baseURL}/auth/get-user-roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve user roles.");
      }

      return { isSuccess: true, result: response };
    } catch (error) {
      throw new Error(`Getting user roles failed: ${error.message}`);
    }
  },

  async setupRoleClaim(role, uid) {
    try {
      const response = await fetch(`${appConfig.baseURL}/auth/setup-role-claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: role, uid: uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to setup role claim.");
      }

      return { isSuccess: true };
    } catch (error) {
      throw new Error(`Setup role claim failed: ${error.message}`);
    }
  },

  async verifyToken() {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (!user) {
          unsubscribe();
          return resolve(false);
        }
  
        try {
          const tokenResult = await user.getIdTokenResult();
          const expirationTime = new Date(tokenResult.expirationTime);
          resolve(expirationTime > new Date());
        } catch (error) {
          console.error("Failed while verifying token:", error);
          resolve(false);
        } finally {
          unsubscribe();
        }
      });
    });
  }
};

export default Auth;
