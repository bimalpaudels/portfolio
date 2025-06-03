## Introduction

This is the repository of my personal website built using Next.js and Notion SDK which is hosted on [bimals.net](https://bimals.net).

The minimal design and having in-line navigations instead of a navbar is heavily inspired by Lee Robinson's [personal site](https://leerob.com).

## Features

- **Next.js** with typescript
- **Tailwind CSS** for styling
- **Notion** as headless CMS for all posts consumed with [official SDK](https://github.com/makenotion/notion-sdk-js)
- **[ISR](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) (Incremental Static Regeneration)** for periodical rendering of all pages from Notion

## Setup

### Project Installation

After forking/cloning the repo:

```bash
pnpm install
pnpm run dev
```

### Notion Integration

[Notion Integration](https://developers.notion.com/docs/create-a-notion-integration) setup is required to consume Notion APIs.

### Notion DB/Page Consumption

Environment variables (.env.local):

```
NOTION_KEY=secret_GLafldkjfdk4hkjaf922dflkfaasdNyq7axYz

NOTION_PAGE_ID=gggab7askjh8adfaa8asd01
NOTION_DB_ID=your_posts_database_id
NOTION_PROJECTS_DB_ID=your_projects_database_id
```

In the root page.tsx:

```javascript
import { fetchNotionPageContent } from "@/lib";
import { NotionBlockRenderer } from "@/components";

const pageId = process.env.NOTION_PAGE_ID;

export default async function Page() {
  if (!pageId) {
    throw new Error("NOTION_PAGE_ID is not defined in environment variables.");
  }
  const page = await fetchNotionPageContent(pageId);
  return (
    <>
      <NotionBlockRenderer blocks={page} />
    </>
  );
}
```

If everything is setup correctly, [localhost:3000](http://localhost:3000), should have the content from Notion Page.

### Working demo

I have used this [README.md](https://bimals.net/posts/nextjs-notion-integration) in a Notion post as a working example/demo.

## Project Structure

```
/
├── components/           # React components
│   ├── notion/          # Notion-specific renderers
│   │   ├── BlockRenderer.tsx           # Page content blocks
│   │   ├── DatabaseListView.tsx        # Generic list view
│   │   ├── DatabaseGalleryView.tsx     # Generic gallery view
│   │   └── index.ts                    # Exports
│   ├── NotionComponents.tsx
│   ├── index.ts
│   └── ...
├── lib/                 # Utility functions and API clients
│   ├── notion.ts        # Notion API functions
│   ├── utils.ts         # General utilities
│   ├── mappings.ts      # Color and style mappings
│   └── index.ts         # Main exports
├── types/               # TypeScript type definitions
│   ├── notion.ts        # Notion-related types
│   └── index.ts         # Type exports
├── app/                 # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
└── ...
```

## Component Usage

### Notion Renderers

The project uses specialized components for different Notion content types:

- **`NotionBlockRenderer`** - Renders page content blocks (headings, paragraphs, code, etc.)
- **`DatabaseListView`** - Generic list view for any database
- **`DatabaseGalleryView`** - Generic gallery/card view for any database

```javascript
// For page content
import { NotionBlockRenderer } from "@/components";
<NotionBlockRenderer blocks={pageBlocks} />;

// For posts list (using generic list view)
import { DatabaseListView } from "@/components";
<DatabaseListView
  pages={posts}
  titleProperty="Title"
  descriptionProperty="Description"
  slugProperty="slug"
  linkPrefix="/posts"
/>;

// For projects gallery (using generic gallery view)
import { DatabaseGalleryView } from "@/components";
<DatabaseGalleryView
  pages={projects}
  titleProperty="Name"
  descriptionProperty="Description"
  slugProperty="slug"
  statusProperty="Status"
  tagsProperty="TechStack"
  linkPrefix="/projects"
  showImage={true}
/>;

// For custom database views
import { DatabaseListView, DatabaseGalleryView } from "@/components";

// Custom list view
<DatabaseListView
  pages={pages}
  titleProperty="Title"
  descriptionProperty="Description"
  slugProperty="slug"
  linkPrefix="/custom"
/>

// Custom gallery view
<DatabaseGalleryView
  pages={pages}
  titleProperty="Name"
  statusProperty="Status"
  tagsProperty="Tags"
  linkPrefix="/items"
  showImage={false}
/>
```

### Database Fetching

The project provides flexible database fetching functions:

```javascript
import {
  fetchDatabasePages, // Generic function
  fetchDatabaseContent, // Posts database
  fetchProjectsDatabaseContent, // Projects database
} from "@/lib";

// Generic usage with any database ID
const pages = await fetchDatabasePages("your_database_id", "Published");

// Specific databases using environment variables
const posts = await fetchDatabaseContent();
const projects = await fetchProjectsDatabaseContent();
```

### Example: Custom Books Database

Here's how you could create a books page using the generic components:

```javascript
// app/books/page.tsx
import { fetchDatabasePages } from "@/lib";
import { DatabaseGalleryView } from "@/components";

export default async function Books() {
  const books = await fetchDatabasePages(process.env.BOOKS_DB_ID!);

  return (
    <div>
      <h1>My Book Collection</h1>
      <DatabaseGalleryView
        pages={books}
        titleProperty="Title"
        descriptionProperty="Summary"
        slugProperty="slug"
        statusProperty="ReadingStatus"
        tagsProperty="Genres"
        linkPrefix="/books"
        showImage={false}
        statusColors={{
          "Read": "bg-green-100 text-green-800 border-green-200",
          "Reading": "bg-blue-100 text-blue-800 border-blue-200",
          "Want to Read": "bg-yellow-100 text-yellow-800 border-yellow-200"
        }}
      />
    </div>
  );
}
```

## Notion Blocks

Following are the blocks from Notion that have components at the moment along with those that are WIP. I plan on continuously adding more as per need.

### Working components

- Heading 1
- Heading 2
- Heading 3
- Paragraph (With with rich text support)
- Code Block
- Page Title

### WIP Components

- Image
- Lists

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/bimalpaudels/personal-site/blob/main/LICENSE) file for details.
