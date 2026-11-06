export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Product Page Layout</h2>
      {children}
      <p>This section is specific to the product page layout.</p>
    </div>
  );
}
//this layout is specific to the product page and will wrap the content of the product page
//any component included here will only be rendered for the product page with the given id
//this allows for page-specific layouts and components within the product section
