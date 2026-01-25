"use client";

import {
    Pagination as PagginationComponent,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationDemoProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    ariaLabel?: string;
    maxLength?: number;
}

export function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    ariaLabel = "Pagination",
    maxLength = 7,
}: PaginationDemoProps) {
    // Guard: nothing to paginate
    const router = useRouter();
    const searchParams = useSearchParams();
    if (!onPageChange)
        onPageChange = (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push(`?${params.toString()}`);
        };

    if (totalPages <= 1) return null;

    // Clamp current page to valid range (1-based)
    const current = Math.min(Math.max(currentPage, 1), totalPages);

    type PageToken = number | "ellipsis";

    /**
     * Build the array of page numbers and ellipsis tokens
     * Adapted from Bistro-Bliss pagination logic
     */
    function buildPages(
        total: number,
        currentPage: number,
        max: number
    ): PageToken[] {
        // If total pages fit within max, show all
        if (total <= max) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages: PageToken[] = [];
        const showNeighbours = 1; // pages adjacent to current
        const first = 1;
        const last = total;
        const start = Math.max(currentPage - showNeighbours, first + 1);
        const end = Math.min(currentPage + showNeighbours, last - 1);

        // Always show first page
        pages.push(first);

        // Add ellipsis if there's a gap after first
        if (start > first + 1) {
            pages.push("ellipsis");
        }

        // Show pages around current
        for (let p = start; p <= end; p++) {
            pages.push(p);
        }

        // Add ellipsis if there's a gap before last
        if (end < last - 1) {
            pages.push("ellipsis");
        }

        // Always show last page
        pages.push(last);

        return pages;
    }

    function goTo(page: number) {
        if (page !== current && page >= 1 && page <= totalPages) {
            onPageChange?.(page);
        }
    }

    const pages = buildPages(totalPages, current, maxLength);
    const previousDisabled = current <= 1;
    const nextDisabled = current >= totalPages;

    return (
        <PagginationComponent aria-label={ariaLabel}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!previousDisabled) {
                                goTo(current - 1);
                            }
                        }}
                        aria-disabled={previousDisabled}
                        aria-label="Previous page"
                        className={
                            previousDisabled
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                {pages.map((p, i) => {
                    if (p === "ellipsis") {
                        return (
                            <PaginationItem key={`ellipsis-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    const isActive = p === current;
                    return (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={isActive}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goTo(p);
                                }}
                                aria-current={isActive ? "page" : undefined}
                                aria-label={`Page ${p}`}
                                className="cursor-pointer"
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!nextDisabled) {
                                goTo(current + 1);
                            }
                        }}
                        aria-disabled={nextDisabled}
                        aria-label="Next page"
                        className={
                            nextDisabled
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </PagginationComponent>
    );
}
