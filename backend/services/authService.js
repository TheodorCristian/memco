const { auth, firestore } = require("../configurations/firebaseconfig");

const AuthService = {
  async getUserById(uid) {
    try {
      const userDoc = await firestore.collection("users").doc(uid).get();
      if (!userDoc.exists) {
        throw new Error("No user found!");
      }

      // Extract user data from the document
      const userData = userDoc.data();
      return userData; // Return user details directly (already in JSON format)
    } catch (err) {
      throw new Error(err);
    }
  },

  async sendPasswordResetEmail(email) {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      throw new Error(err);
    }
  },

  async confirmPasswordReset(oobCode, newPassword) {
    try {
      await auth.verifyPasswordResetCode(oobCode);
      await auth.confirmPasswordReset(oobCode, newPassword);
    } catch (err) {
      throw new Error(err);
    }
  },

  async verifyToken(token) {
    try {
      const tokenResponse = await auth.verifyIdToken(token);
      return tokenResponse;
    } catch (err) {
      throw new Error("Token verification failed");
    }
  },

  async createNewUser(data) {
    try {
      // Create a new user document in Firestore

      const roleRef = await AuthService.getRoleDocumentByName(data.role);
      const role = await firestore.collection("roles").doc(roleRef);

      const roles = [role];
      const userDocRef = await firestore.collection("users").doc(data.uid);
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        roles: roles,
      };
      const result = await userDocRef.set(userData);

      return { isSuccess: true };
    } catch (err) {
      throw new Error(err + ": Error on creating new user!");
    }
  },

  async getUserRoles(uid) {
    try {
      const userData = await AuthService.getUserById(uid);

      if (!userData) {
        throw new Error("No 'userData' returned!");
      }

      let userRoles = userData.roles || [];
      const roleNames = [];

      if (!Array.isArray(userRoles)) {
        userRoles = [userRoles];
      }

      for (const roleRef of userRoles) {
        const roleSnapshot = await roleRef.get();

        if (roleSnapshot.exists) {
          const roleData = roleSnapshot.data();
          // Extract the role name or other relevant data from the role document
          const roleName = roleData.name;
          roleNames.push(roleName);
        }
      }

      return roleNames;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getRoleDocumentByName(roleName) {
    try {
      const querySnapshot = await firestore
        .collection("roles")
        .where("name", "==", roleName)
        .get();

      if (querySnapshot.empty) {
        throw new Error(`No role found with name: ${roleName}`);
      }

      // Return the first document found with the given role name
      const roleDocument = querySnapshot.docs[0];
      const roleUID = roleDocument.id;

      return roleUID;
    } catch (err) {
      throw new Error(err + ": Error getting role document by name");
    }
  },

  async setupRoleClaimForUser(role, uid) {
    try {
      const result = await auth.setCustomUserClaims(uid, { role: role });
      return result;
    } catch (err) {
      throw new Error(err + ": Error setting role claim to user");
    }
  },
};

module.exports = AuthService;
