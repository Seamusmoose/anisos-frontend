import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div>
        <Link href={`/`}>Home</Link>
      </div>

      <nav>
        <ul>
          <li>t</li>
        </ul>
      </nav>
    </header>
  );
}
