import clsx from "clsx";

type Props = {
    mini?: boolean;
    title: string;
    url: string;
}

export function VideoRenderer(props: Props) {
    const {mini, title, url} = props;
    return (
        <div
            className={clsx("relative w-full", {
                "aspect-video": mini,
                "aspect-[97/60] sm:aspect-[97/44]": !mini,
            })}
        >
            <iframe
                className="h-full w-full rounded-md"
                src={url}
                title="Probify Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}