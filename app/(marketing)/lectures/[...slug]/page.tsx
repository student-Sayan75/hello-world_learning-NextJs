//this is called catch all segments where all the nested routes under lectures will be captured in a array of strings called slug
export default async function LecturesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  console.log(slug);
  console.log("slug length:", slug.length);
  return (
    <div>
      <h1>Lectures Page</h1>
      <p>
        {slug.length === 0
          ? "No specific lecture selected."
          : `This is the lectures page for slug: ${slug.join("/")}`}
      </p>
    </div>
  );
}
//istead of checking slug length for 0 as it si simple catch all segment so for /lectures route we will see not found page to handle this case we have to use optional catch all segment by changing [...slug] to [[...slug]]
