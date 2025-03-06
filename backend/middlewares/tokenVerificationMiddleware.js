const AuthService = require("../services/authService");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token ? token.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const decodedToken = await AuthService.verifyToken(tokenWithoutBearer);
    const role = decodedToken.role;

    const tokenExpirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > tokenExpirationTime) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const requestedUrl = req.originalUrl;
    const routeAccessConfig = {
      "/admin/dashboard": {
        roles: ["admin"],
      },
      "/admin/orders": {
        roles: ["admin"],
      },
      "/admin/generate-qr-codes": {
        roles: ["admin"],
      },
      "/operator/generate-video": {
        roles: ["operator"],
      },
      "/profile": {
        roles: ["user", "admin"],
      },
      "/orders": {
        roles: ["admin"],
      },

      // Add more routes and their allowed roles as needed
    };

    const routeConfig = routeAccessConfig[requestedUrl];
    if (!routeConfig) {
      return res.status(404).json({ error: "Route not found" });
    }

    const allowedRoles = routeConfig.roles;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Error in token verification:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyFirebaseToken;
