import { ReactNode } from "react";

// type SizeClassName = `w-${number} h-${number}`

interface RoundelProps {
    className?: string;
    colorClassName?: string;
    sizeClassName?: string;
    children?: ReactNode;
}

export default function Roundel({
    colorClassName = "bg-primary",
    sizeClassName = "w-8 h-8",
    className = "",
    children,
}: RoundelProps) {
    return (
        <div
            className={`${sizeClassName} ${colorClassName} rounded-lg flex items-center justify-center ${className}`}
        >
            {children}
        </div>
    );
}
