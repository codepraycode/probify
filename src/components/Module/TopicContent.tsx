// "use client";

// import { useRef, useState } from "react";
import { VideoRenderer } from "../Common/VideoPlayer";
import clsx from "clsx";
import ClassTextContent from "./Topic/TextContent";

// export default async function TopicContent() {
//     // const [hideVideo, setHideVideo] = useState(false);
//     // const contentRef = useRef<HTMLDivElement>(null);
//     // const observerRef = useRef<IntersectionObserver>(null);

//     return (
//         // <section className="pb-[120px] ">
//         <main className="w-full scroll-smooth pt-[80px]">
//             {/* <div
//                 className={clsx(
//                     "h-screen snap-y snap-mandatory snap-center overflow-y-scroll",
//                     {
//                         hidden: hideVideo,
//                     },
//                 )}
//             >
//                 <ClassVideoContent />
//             </div> */}

//             <section className={clsx(
//                 "snap-start py-12",
//                 // {
//                 //     "pt-[30vh]": hideVideo
//                 // }
//             )}>
//                 <div className="container space-y-10">
                    
//                     <ClassTextContent />
//                 </div>
//             </section>
//         </main>
//     );
// }

function ClassVideoContent() {
    return (
        <section className="relative h-screen w-full snap-start">
            <VideoRenderer
                url="https://www.youtube.com/embed/NpEaa2P7qZI?si=thAmeYrbyvTowjXN?autoplay=0&rel=0&showinfo=0&modestbranding=1"
                title="Probify Intro Video"
            />
        </section>
    );
}
