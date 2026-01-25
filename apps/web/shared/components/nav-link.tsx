"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/core/lib/utils";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
    children: ReactNode;
    className?: string; // Common classes
    activeClassName?: string; // Classes to add when active
    inactiveClassName?: string; // Classes to add when inactive
    exact?: boolean; // Whether to check for exact match
}

export function NavLink({
    children,
    className,
    activeClassName,
    inactiveClassName,
    exact = false,
    ...props
}: NavLinkProps) {
    const pathname = usePathname();
    const href =
        typeof props.href === "string" ? props.href : props.href.toString();

    const isActive = exact
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            {...props}
            className={cn(
                className,
                isActive ? activeClassName : inactiveClassName
            )}
        >
            {children}
        </Link>
    );
}
