import { useAuth } from "hooks/useAuth";
import Link from "next/link";

import { Search } from "./Search";

export default function Header() {
  const { user, admin, logout } = useAuth();

  return (
    <header>
      <div>
        <Link href={`/`}>Home</Link>

        {admin ? (
          <>
            <Link href={`/`}>Admin Page</Link>
          </>
        ) : null}

        {user ? (
          <>
            <button onClick={() => logout()}>logout</button>
            <Link href={`/account/dashboard`}>dashboard</Link>
          </>
        ) : (
          <>
            <Link href={`/account/login`}>login</Link>
          </>
        )}
      </div>
      <Search />
      <nav>
        <ul>
          <li>t</li>
        </ul>
      </nav>
    </header>
  );
}
