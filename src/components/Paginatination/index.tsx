import { Box } from "../Box";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils";
import { Link } from "../Link";

interface PaginationProps {
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
  link: "text-md text-muted-foreground hover:border-accent-foreground border-b-1 border-transparent transition-all transition-discrete hover:scale-95 hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-accent-foreground focus:ring-offset-2",
  activeLink:
    "text-md text-foreground border-accent-foreground border-b-1 font-medium",
  currentPage:
    "text-md text-foreground border-accent-foreground border-b-1 font-medium cursor-default",
};

export const Pagination = ({ className, pagination }: PaginationProps) => {
  const { first, next, prev, currentPage, last, totalPages } = pagination;

  return (
    <Box
      as={"nav"}
      direction="col"
      align="center"
      justify="center"
      aria-label="Pagination of posts"
      className={cn(className)}
    >
      <Box align="center" justify="center" gap="4" role="list">
        {prev && (
          <>
            <Link
              href={`/blog/${first}`}
              className={classeNames.link}
              aria-label={`Go to first page, page ${first}`}
            >
              <ChevronFirst size={16} />
            </Link>
            <Link
              href={`/blog/${prev}`}
              className={classeNames.link}
              aria-label={`Go to previous page, page ${prev}`}
            >
              <ChevronLeft size={16} />
              <span className="sr-only">Previous</span>
            </Link>
          </>
        )}

        {prev && (
          <Link
            href={`/blog/${prev}`}
            className={classeNames.link}
            aria-label={`Go to page ${prev}`}
          >
            {prev}
          </Link>
        )}

        <span
          className={classeNames.currentPage}
          aria-current="page"
          aria-label={`Current page ${currentPage} of ${totalPages}`}
        >
          {currentPage}
        </span>

        {next && (
          <Link
            href={`/blog/${next}`}
            className={classeNames.link}
            aria-label={`Go to page ${next}`}
          >
            {next}
          </Link>
        )}

        {next && (
          <>
            <Link
              href={`/blog/${next}`}
              className={classeNames.link}
              aria-label={`Go to next page, page ${next}`}
            >
              <ChevronRight size={16} />
              <span className="sr-only">Next</span>
            </Link>
            <Link
              href={`/blog/${last}`}
              className={classeNames.link}
              aria-label={`Go to last page, page ${last}`}
            >
              <ChevronLast size={16} />
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
