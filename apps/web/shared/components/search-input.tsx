"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/src/core/layers/presentation/hooks/use-debounce";
import { cn } from "@/src/core/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value?: string;
    onChange: (value: string) => void;
    delay?: number;
}

export function SearchInput({
    value: initialValue,
    onChange,
    delay = 500,
    className,
    placeholder = "Search...",
    ...props
}: SearchInputProps) {
    const [value, setValue] = React.useState(initialValue || "");
    const debouncedValue = useDebounce(value, delay);

    React.useEffect(() => {
        if (initialValue !== undefined) {
            setValue(initialValue);
        }
    }, [initialValue]);

    const mounted = React.useRef(false);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        onChange(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                {...props}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn("pl-9", className)}
            />
        </div>
    );
}
