-- AddForeignKey
ALTER TABLE "TopicProgress" ADD CONSTRAINT "TopicProgress_topicSlug_fkey" FOREIGN KEY ("topicSlug") REFERENCES "Topic"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
