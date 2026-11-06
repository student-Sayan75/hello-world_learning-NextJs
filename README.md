# Next.js 16 Learning Notes — hello-world

Personal revision notes of all the Next.js (App Router) concepts I have learned and implemented in this project. Each topic below explains **what it is**, **where I implemented it**, and **how it works**, so I can revise quickly in the future.

> Tech stack: **Next.js 16.4.3** · **React 19** · **TypeScript** · Tailwind CSS 4

---

## Topics Covered

1. [File-Based Routing & Pages](#1-file-based-routing--pages)
2. [Nested Routes](#2-nested-routes)
3. [Route Groups `(folder)`](#3-route-groups-folder)
4. [Multiple Root Layouts](#4-multiple-root-layouts)
5. [Layouts & Page-Specific Layout Components](#5-layouts--page-specific-layout-components)
6. [Private Folders `_folder` and `%5f`](#6-private-folders-_folder-and-5f)
7. [File Colocation](#7-file-colocation)
8. [Dynamic Routes `[id]`](#8-dynamic-routes-id)
9. [Nested Dynamic Routes](#9-nested-dynamic-routes)
10. [Catch-All Segments `[...slug]`](#10-catch-all-segments-slug)
11. [Optional Catch-All Segments `[[...slug]]`](#11-optional-catch-all-segments-slug)
12. [Custom Not-Found Pages & `notFound()`](#12-custom-not-found-pages--notfound)
13. [Static Metadata](#13-static-metadata)
14. [Title Metadata Rules (default / template / absolute)](#14-title-metadata-rules-default--template--absolute)
15. [Dynamic Metadata — `generateMetadata()`](#15-dynamic-metadata--generatemetadata)
16. [Client Components & `usePathname()`](#16-client-components--usepathname)
17. [Async `params` in Next.js 16](#17-async-params-in-nextjs-16)
18. [App Icons (icon.svg / icon.png)](#18-app-icons-iconsvg--iconpng)

---

## Route Map

| URL                              | File                                                       | Concept                                           |
| -------------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| `/`                              | `app/(marketing)/page.tsx`                                 | Home page (default page for localhost:3000/)      |
| `/about`                         | `app/(marketing)/about/page.tsx`                           | Static route + static metadata                    |
| `/about/profile`                 | `app/(marketing)/about/profile/page.tsx`                   | Nested route                                      |
| `/contact`                       | `app/(marketing)/contact/page.tsx`                         | Static route                                      |
| `/dashboard`                     | `app/(marketing)/dashboard/page.tsx`                       | File colocation (`user-details.tsx`)              |
| `/login`                         | `app/(auth)/login/page.tsx`                                | Route group + static metadata                     |
| `/signUp`                        | `app/(auth)/signUp/page.tsx`                               | Route group                                       |
| `/books/:id`                     | `app/(marketing)/books/[id]/page.tsx`                      | Dynamic route + client component (`usePathname`)  |
| `/product`                       | `app/(marketing)/product/page.tsx`                         | Product list page                                 |
| `/product/:id`                   | `app/(marketing)/product/[id]/page.tsx`                    | Dynamic route + `generateMetadata` + `notFound()` |
| `/product/:id/reviews`           | `app/(marketing)/product/[id]/reviews/page.tsx`            | Nested route inside dynamic segment               |
| `/product/:id/reviews/:reviewId` | `app/(marketing)/product/[id]/reviews/[reviewId]/page.tsx` | Nested dynamic route                              |
| `/lectures/...`                  | `app/(marketing)/lectures/[...slug]/page.tsx`              | Catch-all segments                                |
| `/cources` and `/cources/...`    | `app/(marketing)/cources/[[...slug]]/page.tsx`             | Optional catch-all segments                       |
| — (not routable)                 | `app/_lib/page.tsx`                                        | Private folder                                    |

---

## 1. File-Based Routing & Pages

- In the App Router, **every folder inside `app/` becomes a route segment**, and a `page.tsx` file makes that segment publicly accessible through a URL.
- Only files named `page.tsx` (or `route.tsx` for APIs) are treated as routes — everything else is just a file sitting in the folder.
- Implemented in `app/(marketing)/page.tsx` → renders `Hello, World!` when the user hits `http://localhost:3000/`.
- Every page exports a **default React component**.

```tsx
export default function Home() {
  return <div>Hello, World!</div>;
}
```

## 2. Nested Routes

- A folder inside another route folder creates a **nested URL segment**.
- Implemented in `app/(marketing)/about/profile/page.tsx` → available at `/about/profile`.
- The folder tree directly mirrors the URL path: `about/profile/page.tsx` ⇒ `/about/profile`.

## 3. Route Groups `(folder)`

- A folder wrapped in **parentheses** like `(auth)` or `(marketing)` is a **route group** — it groups similar routes/pages together under a common folder **without appearing in the URL**.
- `(auth)/login/page.tsx` ⇒ `/login` (not `/auth/login`).
- Helps organize the app structure (e.g. all authentication pages like login & signUp under `(auth)`, all marketing pages under `(marketing)`) **without affecting the actual URL paths**.
- Implemented in `app/(auth)/` and `app/(marketing)/`.

## 4. Multiple Root Layouts

- This project has **no `app/layout.tsx`**. Instead, **each route group has its own root layout** with its own `<html>` and `<body>` tags:
  - `app/(marketing)/layout.tsx` → root layout for all marketing pages (includes `Header` + `Footer`).
  - `app/(auth)/layout.tsx` → root layout for all auth pages (login, signup, password recovery).
- Previously `app/(marketing)/layout.tsx` was the root layout of the entire application; after introducing multiple route groups it became the **scoped root layout of the marketing section only**.
- Any component included in a layout (like Header/Footer) is rendered **automatically on every page** that uses that layout — a common pattern for a consistent UI across pages.
- This is how different sections of one app can have completely different page shells.

## 5. Layouts & Page-Specific Layout Components

- A `layout.tsx` wraps the `children` of its segment and every segment below it.
- Implemented:
  - `app/(marketing)/layout.tsx` — wraps all marketing pages with `Header` and `Footer`.
  - `app/(auth)/layout.tsx` — wraps all auth pages with the "Authentication Layout" shell.
  - `app/(marketing)/product/[id]/productLayout.tsx` — a **page-specific layout component** for the product section.
- Note for revision: Next.js only auto-applies files named exactly `layout.tsx`. Since this one is named `productLayout.tsx`, it behaves as a **colocated component** that must be imported to wrap content. Naming it `layout.tsx` would make Next.js apply it automatically to the `product/[id]` segment and everything under it.

## 6. Private Folders `_folder` and `%5f`

- Any folder prefixed with **`_`** is considered **private** — it is excluded from routing and cannot be accessed directly by users via URL.
- Used for internal components, utilities, or shared logic within the app.
- Helps organize the app structure and keeps internal logic separate from public-facing pages.
- Implemented in `app/_lib/page.tsx` (a private library page for internal use).
- A private folder can also be created using **`%5f`** (the URL-encoded representation of `_`): `%5flib` ≡ `_lib`. Useful when the `_` character might cause issues in URLs or routing mechanisms.

## 7. File Colocation

- Only `page.tsx` becomes a route — **any other file inside a route folder is simply colocated** and safe to keep next to the page that uses it.
- Implemented in `app/(marketing)/dashboard/user-details.tsx` — a regular component (not a route, since it's not named `page.tsx`) imported and rendered inside `app/(marketing)/dashboard/page.tsx` to display user details.
- Takeaway: related components, styles, and utils can live **right beside the page** that consumes them.

## 8. Dynamic Routes `[id]`

- A folder named with **square brackets** like `[id]` creates a **dynamic segment** — one route file handles many URLs (`/books/1`, `/books/2`, ...).
- The dynamic value is read from **`params`** (a Promise in Next.js 16 → must be `await`ed, see topic 17).
- Implemented in:
  - `app/(marketing)/product/[id]/page.tsx` → `/product/:id`
  - `app/(marketing)/books/[id]/page.tsx` → `/books/:id` (reads the id from the pathname on the client, see topic 16)

## 9. Nested Dynamic Routes

- Dynamic segments can be nested inside each other, and **all params arrive together** in the same `params` object.
- Implemented in `app/(marketing)/product/[id]/reviews/[reviewId]/page.tsx` → `/product/:id/reviews/:reviewId`.

```tsx
export default async function ProductReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params; // both dynamic values together
  ...
}
```

- `app/(marketing)/product/[id]/reviews/page.tsx` → `/product/:id/reviews` shows that a dynamic segment can also contain plain nested routes (all reviews of a particular product).

## 10. Catch-All Segments `[...slug]`

- `[...slug]` captures **all nested route segments** under a path into an **array of strings** called `slug`.
- Example: `/lectures/math/algebra/linear` ⇒ `slug = ["math", "algebra", "linear"]`.
- Implemented in `app/(marketing)/lectures/[...slug]/page.tsx`.
- ⚠️ Limitation learned: a plain catch-all **does NOT match the bare parent route** — `/lectures` itself shows the not-found page. To also match `/lectures`, use the optional catch-all (next topic).

## 11. Optional Catch-All Segments `[[...slug]]`

- `[[...slug]]` (double brackets) works like a catch-all **but also matches the bare parent route** (`/cources` with no slug).
- When nothing is matched, `slug` is `undefined`/empty → handle the `length 0` case to show a default view ("No specific course selected").
- Implemented in `app/(marketing)/cources/[[...slug]]/page.tsx`.

```tsx
const { slug } = await params;
if (!slug || slug.length === 0) {
  return <p>No specific course selected.</p>;
}
return <p>Slug: {slug.join("/")}</p>;
```

- (Folder name `cources` is kept as-is from the project.)

## 12. Custom Not-Found Pages & `notFound()`

- A `not-found.tsx` file renders a **custom 404 UI** for its segment.
- Implemented:
  - `app/(marketing)/not-found.tsx` — the custom global not-found page for the application (`404 - Page Not Found`).
  - `app/(marketing)/product/[id]/not-found.tsx` — a **route-level** custom 404 just for products (`404 - Product Not Found`).
- The **`notFound()`** function from `next/navigation` can be called inside a page to **programmatically render the closest `not-found.tsx`**:

```tsx
import { notFound } from "next/navigation";

const { id } = await params;
if (id > "5") {
  notFound(); // renders product/[id]/not-found.tsx
}
```

- So `/product/6` (only 5 products exist) shows the product-specific 404 instead of a broken page.

## 13. Static Metadata

- Export a `metadata` object from any `page.tsx` or `layout.tsx` to give the page a `<title>` and `<meta name="description">` used by the browser and search engines.
- It stays **the same for every instance** of that page/layout.
- Implemented:
  - `app/(auth)/login/page.tsx` — `title: "Login Page"`.
  - `app/(marketing)/layout.tsx` — marketing section title/description shown on all marketing pages using this layout.
  - `app/(marketing)/about/page.tsx` — `title: "About"` (uses the `Metadata` type from `next`).

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "This is the about page of the marketing section",
};
```

## 14. Title Metadata Rules (default / template / absolute)

`title` can be a plain **string** or an **object** with `default` and `template` properties (implemented in `app/(marketing)/layout.tsx`):

```tsx
export const metadata: Metadata = {
  title: {
    default: "Marketing Section",
    template: " Marketing Section | %s",
  },
  description: "This is the marketing section of the application",
};
```

Rules learned:

- **`default`** — used when an inner page has **no explicit title** of its own; the outer layout's default title is shown.
- **`template` with `%s`** — when an inner page **defines its own title**, the outer layout's template wraps it: the inner title is dynamically printed at the `%s` position, and the layout can add its own text beside it (e.g. `Marketing Section | About`).
- **`absolute`** — if the inner page uses `title: { absolute: "..." }`, then **no matter what the outer layout defines**, the absolute title is used as-is.

## 15. Dynamic Metadata — `generateMetadata()`

- Use the exported **`generateMetadata()`** function when metadata must change based on **params or other dynamic data** — each page instance gets a **unique title/description** (good for SEO).
- Implemented in `app/(marketing)/product/[id]/page.tsx`:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // for real world projects do fetch the details here using fn and set it to the metadata accordingly
  return {
    title: `Product ${id} Detail`,
    description: `This is the detail page for product with ID: ${id}`,
  };
}
```

- So there are **two types of metadata**:
  1. **Static metadata** — `export const metadata`, same for all instances.
  2. **Dynamic metadata** — `export async function generateMetadata()`, unique per instance.

## 16. Client Components & `usePathname()`

- Adding **`"use client"`** at the top of a file turns it into a **Client Component**, allowing React hooks and browser APIs.
- The **`usePathname()`** hook from `next/navigation` returns the **current URL pathname** inside client components.
- Implemented in `app/(marketing)/books/[id]/page.tsx`, where the book ID is extracted by splitting the pathname:

```tsx
"use client";

import { usePathname } from "next/navigation";

export default function BookPage() {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop(); // last segment = book ID
  ...
}
```

- `pathname.split("/")` — splits the pathname into segments:
  - `.pop()` → last segment (the book ID)
  - `[1]` → first segment after the initial slash
  - `[2]` → second segment after the initial slash

## 17. Async `params` in Next.js 16

- In Next.js 16, **`params` is a Promise** in pages/layouts/`generateMetadata` — it must be **awaited** before destructuring:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
}
```

- Used everywhere in this project: `product/[id]`, `product/[id]/reviews/[reviewId]`, `lectures/[...slug]`, `cources/[[...slug]]`.

## 18. App Icons (icon.svg / icon.png)

- `icon.svg` — the icon used for the application; displayed as the favicon and in other places where the application icon is required.
- Since SVG is not supported in many places, a backup PNG is also provided.
- `icon.png` — the backup icon used in places where SVG is not supported.
- Both live directly inside `app/`, and Next.js picks them up automatically by file convention.

---

## Quick Revision Cheat-Sheet

| Convention                               | Meaning                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `page.tsx`                               | Makes a folder a public route                                      |
| `layout.tsx`                             | Wraps a segment + all children; put shared UI (header/footer) here |
| `not-found.tsx`                          | Custom 404 for its segment                                         |
| `(folder)`                               | Route group — organizes files, no effect on URL                    |
| `_folder` / `%5ffolder`                  | Private folder — excluded from routing                             |
| `[id]`                                   | Dynamic segment → `params.id`                                      |
| `[...slug]`                              | Catch-all → `params.slug` string array (no bare parent route)      |
| `[[...slug]]`                            | Optional catch-all → also matches the bare parent route            |
| `"use client"`                           | Marks a Client Component (hooks allowed)                           |
| `export const metadata`                  | Static metadata                                                    |
| `export async function generateMetadata` | Dynamic metadata based on params                                   |
| `notFound()` from `next/navigation`      | Triggers closest `not-found.tsx`                                   |
| `usePathname()` from `next/navigation`   | Current pathname in client components                              |
| `params` / `searchParams`                | **Promises** in Next.js 16 — always `await` them                   |
| `icon.svg` / `icon.png` in `app/`        | Favicon / app icon by file convention                              |

---

_More topics will be added here as I continue learning Next.js._
