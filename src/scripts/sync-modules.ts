#!/usr/bin/env node
import prisma from "../db";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const modulePath = path.join(process.cwd(), "src/data/docs/modules");

async function syncModules() {
    console.log("📚 Starting module sync...");
    const start = Date.now();
    const files = fs.readdirSync(modulePath);

    for (const file of files) {
        if (!file.endsWith(".mdx")) continue;

        try {

            const fileContent = fs.readFileSync(path.join(modulePath, file), "utf8");
            const { data: frontmatter } = matter(fileContent);
            const slug = file.replace(".mdx", "");

            const {topicRefs, ...rest} = frontmatter;
    
            const dt = {
                ...rest,
                slug,
                title: rest.title || slug.replace(/-/g, " "),
                description: rest.description || "",
                // order: rest.order ?? 999,
                // locked: rest.locked ?? true,
                topics: {
                    connect: topicRefs?.map((slug: string) => ({ slug })) || [],
                },
            }
    
            await prisma.module.upsert({
                where: { slug },
                update: dt,
                create: dt,
            });
    
            console.log(`🔄 Synced module: ${slug} with ${frontmatter.topicRefs.length} topics`);
        } catch (error) {
            console.error(`❌ Failed syncing ${file}:`, error instanceof Error ? error.message : error);
        }
    }

    

    console.log("🎉 Module sync completed");

}

syncModules().catch((e) => {
  console.error("🔥 Sync failed:", e);
  process.exit(1);
});