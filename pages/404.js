import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Does not Exist 404</h1>
      <Link href={`/`}>
        <a>Home</a>
      </Link>
    </div>
  );
}
