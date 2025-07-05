import { Box } from "../Box";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils";
import { Link } from "../Link";

interface IPagination {
  className?: string;
  pagination: {
    prev: number | null;
    next: number | null;
    first: number;
    last: number;
    totalPages: number;
    currentPage: number;
  };
}

const classeNames = {
  link: "text-md text-muted-foreground hover:border-accent-foreground border-b-1 border-transparent transition-all transition-discrete hover:scale-95 hover:opacity-85",
  activeLink:
    "text-md text-foreground border-accent-foreground border-b-1 font-medium",
};

export const Pagination = ({ className, pagination }: IPagination) => {
  const { first, next, prev, currentPage, last } = pagination;

  return (
    <Box
      as={"nav"}
      direction="col"
      align="center"
      justify="center"
      aria-label="Pagination of posts"
      className={cn(className)}
    >
      <Box align="center" justify="center" gap="4">
        {prev && (
          <>
            <Link href={`?page=${first}`} className={classeNames.link} prefetch>
              <ChevronFirst size={16} />
            </Link>
            <Link href={`?page=${prev}`} className={classeNames.link} prefetch>
              <ChevronLeft size={16} />
            </Link>
          </>
        )}

        {prev && (
          <Link href={`?page=${prev}`} className={classeNames.link} prefetch>
            {prev}
          </Link>
        )}
        <Link
          href={`?page=${currentPage}`}
          className={classeNames.activeLink}
          aria-label={`Current page ${currentPage}`}
          prefetch
        >
          {currentPage}
        </Link>
        {next && (
          <Link href={`?page=${next}`} className={classeNames.link} prefetch>
            {next}
          </Link>
        )}

        {next && (
          <>
            <Link href={`?page=${next}`} className={classeNames.link} prefetch>
              <ChevronRight size={16} />
            </Link>
            <Link href={`?page=${last}`} className={classeNames.link} prefetch>
              <ChevronLast size={16} />
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
