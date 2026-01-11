"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ padding: 24 }}>
            <h2>Something went wrong</h2>
            <pre style={{ color: "crimson" }}>{error.message}</pre>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
