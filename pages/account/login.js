import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useAuth } from "hooks/useAuth";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();

//   useEffect(() => error && toast.error(error), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Layout>
        <ToastContainer />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>login</button>
        </form>

        <p>Don't have an Account?</p>
        <Link href={`/account/register`}>Register</Link>
      </div>
    </Layout>
  );
}
