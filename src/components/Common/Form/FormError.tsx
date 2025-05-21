
type Prop = {
    error?: string;
}

export default function FormError({error}: Prop) {
    return <p className="mt-1 text-sm text-red-500">{error}</p>;
}