export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <h1>Authentication Layout</h1>
        {children}
        <h3>Please sign in to continue</h3>
      </body>
    </html>
  );
}
// This is the layout component for authentication pages. It wraps the content with a basic HTML structure and provides a consistent layout for all auth-related pages.

//as a part of multiple group layout this layout works for all authentication-related pages such as login, signup, and password recovery.
