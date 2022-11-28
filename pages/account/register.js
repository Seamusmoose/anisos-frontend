import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useAuth } from "hooks/useAuth";

export default function register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) toast.error("passwords do not match");
    register({ username, email, password });
  };

  return (
    <Layout>
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
          <div>
            Confirm Password
            <input
              type="text"
              name="passwordCOnfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>

        <p>Already have an Account?</p>
        <Link href={`/account/login`}>Login</Link>
      </div>
    </Layout>
  );
}
