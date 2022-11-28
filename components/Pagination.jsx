import Link from "next/link";

export default function Pagination({ page, products, lastPage }) {
  return (
    <>
      {page > 1 && (
        <Link href={`/women/clothing?page=${Number(page) - 1}`}>Prev</Link>
      )}

      {page < lastPage && (
        <Link href={`/women/clothing?page=${Number(page) + 1}`}>Next</Link>
      )}
    </>
  );
}
