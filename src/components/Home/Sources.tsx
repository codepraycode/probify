import sourcesData from "@/data/sources";
import { Source } from "@/types/source";
import Image from "next/image";

const Sources = () => {
  return (
      <section className="pt-16">
          <div className="container">
              <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                      <div
                          className="wow fadeInUp flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
                          data-wow-delay=".1s"
                      >
                          {sourcesData.map((data) => (
                              <SingleSource key={data.id} source={data} />
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Sources;

const SingleSource = ({ source }: { source: Source }) => {
    const { href, image, name } = source;

    return (
        <div className="mx-1 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
            <a
                href={href}
                target="_blank"
                rel="nofollow noreferrer"
                className="relative h-24 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
                title={name}
            >
                <Image src={image} alt={name} fill />
            </a>
        </div>
    );
};
