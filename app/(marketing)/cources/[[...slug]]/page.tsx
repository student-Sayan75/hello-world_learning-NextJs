//this is optional catch all segment for courses route
export default async function CoursesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return (
      <div>
        <h1>Courses Page</h1>
        <p>No specific course selected.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Courses Page</h1>
      <p>This is the courses page for slug: {slug?.join("/")}</p>
    </div>
  );
}
//here if the slug is empty it will satisfy  length 0 case and show no specific course selected message.
//this is useful for the /courses route where no specific course is selected initially.
