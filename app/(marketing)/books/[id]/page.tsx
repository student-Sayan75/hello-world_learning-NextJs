"use client";

import { usePathname } from "next/navigation";

export default function BookPage() {
  const pathname = usePathname();
  return (
    <div>
      <h1>Book Page</h1>
      <p>Current pathname: {pathname}</p>
      <p>Book ID: {pathname.split("/").pop()}</p>
      <p>Book ID: {pathname.split("/")[1]}</p>
      <p>Book ID: {pathname.split("/")[2]}</p>
    </div>
  );
}
//usePathname hook is used to get the current pathname in Next.js client components
//pathname.split("/") is used to extract specific segments of the pathname
//pathname.split("/").pop() gets the last segment of the pathname, which is the book ID
//pathname.split("/")[1] gets the first segment after the initial slash
//pathname.split("/")[2] gets the second segment after the initial slash
