export const metadata: { title: string; description: string } = {
  title: "Login Page",
  description: "This is the login page of the application",
};

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

// this is basically grouping of similar routes or pages together under a common folder
// in this case, all authentication-related pages like login and sign up can be placed under the "(auth)" folder

//so when any folder created with parentheses, it is treated as a route group and not as a separate route in the URL
//this helps in organizing the app structure without affecting the actual URL paths for the pages within the group


//this is a type of static meta data that provides information about the page, such as its title and description, which can be used by the browser and search engines.