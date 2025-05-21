
import SectionTitle from "../Common/SectionTitle";
// import { PlayIcon } from "../Common/Icons";

// function PlayButton({onClick}:{onClick: ()=>void}) {
//     return (
//         <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
//             <button
//                 aria-label="video play button"
//                 onClick={onClick}
//                 className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
//             >
//                 <PlayIcon/>
//             </button>
//         </div>
//     );
// }

const Video = () => {
    return (
        <section className="relative z-10 py-16 md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="Learn Probability the Engaging Way"
                    paragraph="Watch how Probify makes math fun and interactive. Our bite-sized lessons and intuitive explanations will change how you see probability—forever."
                    center
                    mb="80px"
                />

                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="wow fadeInUp mx-auto max-w-[1070px] overflow-hidden rounded-md"
                            data-wow-delay=".15s"
                        >
                            <div className="relative aspect-video w-full">
                                <iframe
                                    className="h-full w-full rounded-md"
                                    src="https://www.youtube.com/embed/NpEaa2P7qZI?si=thAmeYrbyvTowjXN?autoplay=0&rel=0&showinfo=0&modestbranding=1"
                                    title="Probify Intro Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat" />
        </section>
    );
};

export default Video;
