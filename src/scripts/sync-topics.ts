#!/usr/bin/env node
import prisma from "../db";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docPath = path.join(process.cwd(), "src/data/docs/topics");



export async function syncTopics() {
  console.log("📚 Starting topic sync...");
  const start = Date.now();
  const files = fs.readdirSync(docPath);

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    try {
        const fileContent = fs.readFileSync(path.join(docPath, file), "utf8");
        const { data: frontmatter } = matter(fileContent);
        const slug = file.replace(".mdx", "");

        const dt = {
                slug, 
            ...frontmatter,
            title: frontmatter.title || slug.replace(/-/g, " "),
            description: frontmatter.description || "",
            difficulty: frontmatter.difficulty || "Medium",
            order: frontmatter.order,
            tags: frontmatter.tags || [],
            locked: frontmatter.locked ?? false,
            createdAt: (frontmatter.createdAt ? new Date(frontmatter.createdAt) : new Date()).toISOString(),
            updatedAt: new Date()
        }


        await prisma.topic.upsert({
            where: { slug },
            update: dt,
            create: dt,
        });

        console.log(`✅ Synced: ${slug}`);
    } catch (error) {
        console.error(`❌ Failed ${file}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(`⏱️ Sync took ${(Date.now() - start) / 1000}s`);

  console.log("🎉 Topic sync completed");
}
