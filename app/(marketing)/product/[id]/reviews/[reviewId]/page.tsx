//this page contains the details of a specific review for a particular product
export default async function ProductReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;
  return (
    <div>
      <h1>Product Review Detail Page</h1>
      <p>
        This is the detail page for review with ID: {reviewId} of product with
        ID: {id}
      </p>
    </div>
  );
}
