import { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../lib/utils";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const SESSION_NAME = "session_verified";

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const AuthContext = createContext({
  csrf: () => {},
  user: INITIAL_USER,
  register: () => {},
  login: () => {},
  isLoading: false,
  status: "",
  sessionVerified: false,
  setStatus: "",
});

export const AuthProvider = () => {
  
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sessionData = localStorage.getItem(SESSION_NAME);
  const initialSessionVerified = sessionData ? JSON.parse(sessionData) : false;
  const [sessionVerified, setSessionVerified] = useState(
    initialSessionVerified
  );
  
  const csrf = async () => {
    await fetch(BACKEND_URL + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });
  };

  const getUser = async () => {
    try {
      const response = await fetch(BACKEND_URL + "/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setSessionVerified(true);
        localStorage.setItem(SESSION_NAME, "true");
      }
    } catch (error) {
      console.warn("Error ", error);
    }
  };

  const handleAuth = async (url, data) => {
    setIsLoading(true);
    try {
      await csrf();
      await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        },
        body: JSON.stringify(data),
      });
      await getUser();
    } catch (error) {
      if (error.response) {
        console.warn(error.response.data);
      } else {
        console.warn("Error ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    await handleAuth(BACKEND_URL + "/register", data);
  };

  const login = async (data) => {
    await handleAuth(BACKEND_URL + "/login", data);
  };

  const logout = async () => {
    try {
      setSessionVerified(false);
      await fetch(BACKEND_URL + "/logout", {
        method:"POST",
        credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
          }
      });
      setUser(INITIAL_USER);
      localStorage.removeItem(SESSION_NAME);
    } catch (error) {
      console.warn("Error ", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user.name == INITIAL_USER.name && localStorage.getItem(SESSION_NAME) != null) {
      fetchUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        csrf,
        user,
        register,
        login,
        logout,
        isLoading,
        status,
        sessionVerified,
        setStatus,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthContext;
