import Link from "next/link";

export default function DashboardEvent({ product, handleDelete }) {
  return (
    <div>
      <Link href={`/women/clothing/${product.id}`}>{product.name}</Link>
      <Link onClick={() => handleDelete(product.id)} href={`#`}>
        delete event
      </Link>
    </div>
  );
}
