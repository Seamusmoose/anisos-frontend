import Link from "next/link";
import { Search } from "./Search";

export default function Header() {
  return (
    <header>
      <div>
        <Link href={`/`}>Home</Link>
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
