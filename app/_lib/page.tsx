export default function LibPage() {
  return (
    <div>
      <h1>Lib Page</h1>
    </div>
  );
}
//this ia a provate library page for internal use within the app
//it is not meant to be accessed directly by users

//when any forlder or route creates with "_", it is considered private and not meant to be accessed directly by users
//such routes are typically used for internal components, utilities, or shared logic within the app

//this helps in organizing the app structure and keeping internal logic separate from public-facing pages

//this private folder can also be created using the prefix "%5f", which is the URL-encoded representation of "_"
//for example, "%5flib" would be equivalent to "_lib" and would also be treated as a private route
//this can be useful in scenarios where the "_" character might cause issues in URLs or routing mechanisms
