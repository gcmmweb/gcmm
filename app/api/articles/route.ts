import { NextResponse } from "next/server";

const PROJECT_ID = "mYwsAuwZ4JBX1m8yGytoC";
const API_TOKEN = "phqSpmOnAFMf1a3iYfHkE76TvXpddwPn2uToiUcfXOOzLJNCkpkQ91nDpRe8Yh7xxz5VsNn0PHb7FtRcykQ";

export async function GET() {
  try {
    const url = `https://codegen.plasmic.app/api/v1/loader/code/published?projectId=${PROJECT_ID}&platform=nextjs&nextjsAppDir=true`;

    const resp = await fetch(url, {
      headers: {
        "x-plasmic-api-project-tokens": `${PROJECT_ID}:${API_TOKEN}`,
        "x-plasmic-loader-version": "10",
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Plasmic API error: ${resp.status} — ${text}`);
    }

    const data = await resp.json();
    const components: any[] = data.components || data.bundle?.components || [];

    const articlePages = components.filter((c: any) => {
      const path = (c.path || "").toLowerCase();
      return path.startsWith("/article") && c.isPage;
    });

    const articles = articlePages.map((page: any, index: number) => {
      const md = page.metadata || {};
      const pagePath = page.path || "";
      return {
        id: page.id || `article-${index}`,
        title: page.displayName || page.name || "Untitled Article",
        excerpt: md.description || md.excerpt || "No description available",
        category: md.category || "Articles",
        author: md.author || "GCMM",
        date: md.date || new Date().toISOString().split("T")[0],
        image: md.image || "/open-book-knowledge.png",
        slug: pagePath.split("/").pop() || "",
        path: pagePath,
      };
    });

    return NextResponse.json({ articles, total: articles.length });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error instanceof Error ? error.message : "Unknown error",
        articles: [],
      },
      { status: 500 }
    );
  }
}
