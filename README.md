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
npm install
npm run dev
```

### Notion Integration

[Notion Integration](https://developers.notion.com/docs/create-a-notion-integration) setup is required to consume Notion APIs.

### Notion DB/Page Consumption

Environment variables (.env.local):

```
NOTION_KEY=secret_GLafldkjfdk4hkjaf922dflkfaasdNyq7axYz

NOTION_PAGE_ID=gggab7askjh8adfaa8asd01
```

In the root page.tsx:

```javascript
import { fetchNotionPageContent } from "@/lib";
import NotionBlockChildrenRenderer from "@/components/NotionRenderers";

const pageId = process.env.NOTION_PAGE_ID;

export default async function Page() {
  if (!pageId) {
    throw new Error("NOTION_PAGE_ID is not defined in environment variables.");
  }
  const page = await fetchNotionPageContent(pageId);
  return (
    <>
      <NotionBlockChildrenRenderer blocks={page} />
    </>
  );
}
```

If everything is setup correctly, [localhost:3000](http://localhost:3000), should have the content from Notion Page.

### Working demo

I have used this [README.md](https://bimals.net/posts/nextjs-notion-integration) in a Notion post as a working example/demo.

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
