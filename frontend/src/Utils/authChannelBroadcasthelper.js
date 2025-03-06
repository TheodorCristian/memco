const handleAuthChannelMessage = (event, { setUser, setToken, setUserRoles, authChannel }) => {
    const { type, user, token, userRoles } = event.data;
  
    switch (type) {
      case "logout":
        setUser(null);
        setToken(null);
        setUserRoles([]);
        sessionStorage.clear();
        console.log('broadcast channel message: logout');
        break;
  
      case "login":
        setUser(user);
        setToken(token);
        setUserRoles(userRoles);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("userToken", JSON.stringify(token));
        sessionStorage.setItem("userRoles", JSON.stringify(userRoles));
        console.log('broadcast channel message: login');
        break;
  
      case "request-auth-data":
        if (user && token && userRoles) {
          authChannel.postMessage({
            type: "sync-auth-data",
            user,
            token,
            userRoles,
          });
        }
        console.log('broadcast channel message: sync-auth-data');
        break;
  
      case "sync-auth-data":
        setUser(user);
        setToken(token);
        setUserRoles(userRoles);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("userToken", JSON.stringify(token));
        sessionStorage.setItem("userRoles", JSON.stringify(userRoles));
        console.log('broadcast channel message: sync-auth-dat');
        break;
  
      default:
        console.warn("Unknown message type:", type);
    }
  };
  
  export default handleAuthChannelMessage;