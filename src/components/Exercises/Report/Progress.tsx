
interface ProgressProps {
    value: number; // Between 0 and 100
}

export default function Progress({ value }: ProgressProps) {
    return (
        <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
            <div
                className="h-full bg-primary transition-all"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
