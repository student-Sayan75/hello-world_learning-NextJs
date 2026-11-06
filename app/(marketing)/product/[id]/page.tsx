import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //for real world projects do fetch the details here using fn and set it to the metadata accordingly
  return {
    title: `Product ${id} Detail`,
    description: `This is the detail page for product with ID: ${id}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id > "5") {
    notFound();
  }
  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>This is the detail page for product with ID: {id}</p>
    </div>
  );
}

// The generateMetadata function is used to dynamically generate metadata for the product detail page based on the product ID.
// This allows the page to have a unique title and description for each product, which can improve SEO and provide more relevant information to users.

//so there is total two type of metadata
//1. Static metadata: defined using the metadata export in a layout or page, which remains the same for all instances of that layout or page.
//2. Dynamic metadata: generated using the generateMetadata function, which can change based on parameters or other dynamic data, allowing for unique metadata for each page instance.
