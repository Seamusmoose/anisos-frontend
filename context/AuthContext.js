import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "../config";
// import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  console.log(user, "u");
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async (user) => {
      const res = await fetch(`${NEXT_URL}/api/user`);
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        if (
          router.pathname === "/account/dashboard" ||
          router.pathname === "/women/clothing/add" ||
          router.pathname === "/women/clothing/edit/[id]"
        ) {
          router.push("/account/login");
        }
      }
    };

    checkUserLoggedIn();
  }, []);

  console.log(user, error);

  const register = async (user) => {};

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      console.log(data.message, "d");
      toast.error(data.message);
    }
  };

  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
