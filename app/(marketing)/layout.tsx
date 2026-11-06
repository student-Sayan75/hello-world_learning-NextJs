import Header from "./header";
import Footer from "./footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Marketing Section",
    template: " Marketing Section | %s",
  },
  description: "This is the marketing section of the application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
//previously this was the root layout for the entire application, but now it has been scoped to the marketing section only.
//header and footer are included in the root layout so that they appear on every page of the application
//this is a common pattern in Next.js to have a consistent layout across all pages
//any component included in the root layout will be rendered on every page automatically

// This layout is specific to the marketing section of the application after making multiple root layouts.
//now it became layout of the marketing section of the application, ensuring that the header and footer are consistently displayed across all marketing-related pages.

// The metadata defined at the top provides static information about the marketing section, which can be used by the browser and search engines.
//this will show in all the marketing-related pages that use this layout.

//Rules of title metadata
//title can be defined in string format or in object format with default and template properties for dynamic titles.

//if in this outer layout the default is given and in the inner pages if there is no explicit title metadata given then then outer metadata will be shown
//if in the inner page the title is explicitly defined in default format then in the puter layout there has to be use the template format with %s to dynamically print the inner title in the %s position and can add its own too in the side

//if the inner one use the absolute format the no matter what is in the outer layout, the absolute title will be used.
