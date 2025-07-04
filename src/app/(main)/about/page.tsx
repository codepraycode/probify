import Breadcrumb from "@/components/Common/Breadcrumb";
import About from "@/components/Home/About";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
      <>
          <Breadcrumb
              pageName="About Page"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
              trail={[]}
          />
          <About />
      </>
  );
};

export default AboutPage;
