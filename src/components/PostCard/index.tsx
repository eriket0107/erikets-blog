import Image from "next/image";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { LanguageType, PostType } from "@/interfaces/post";
import { Link } from "../Link";
import { truncateString } from "@/utils";
import { useLocale } from "next-intl";
import { Tag } from "../Tag";

interface PaginationProps {
  post: PostType;
  ariaPosinset?: number;
  ariaSetsize?: number;
  hasImage?: boolean;
}

const MAX_CHARACTERS_LENGTH = 110;
const MAX_TAG_LENGTH = 10;

export const PostCard = ({
  post,
  ariaPosinset,
  ariaSetsize,
  hasImage = true,
}: PaginationProps) => {
  const { description, imgSrc, title, date, id, tags } = post;
  const language = useLocale() as LanguageType;
  const truncatedDescription = truncateString(
    description[language],
    MAX_CHARACTERS_LENGTH,
  );

  const dateTime = new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
  return (
    <Box
      as="article"
      direction="col"
      gap="4"
      height="auto"
      className="m-0 snap-center md:mx-auto"
      aria-posinset={ariaPosinset}
      aria-setsize={ariaSetsize}
    >
      <Link
        href={`/post/${id}`}
        className="group focus:outline-accent md:hover:shadow-accent-foreground block rounded-sm transition-all transition-discrete focus:outline-2 focus:outline-offset-2 md:hover:scale-99 md:hover:opacity-85 md:hover:shadow-md/20"
        aria-label={`Read full post: ${title[language]}`}
      >
        <Box className="flex-col rounded-sm md:flex-row">
          {hasImage && (
            <Box
              height={"216px"}
              className="relative min-w-[300px] overflow-hidden rounded-t-sm md:w-[300px] md:rounded-l-sm md:rounded-r-none"
            >
              <Image
                fill
                src={imgSrc}
                alt={`Cover image for blog post: ${title[language]}`}
                className="object-cover transition-all transition-discrete md:group-hover:scale-115"
              />
            </Box>
          )}
          <Box
            direction="col"
            className="mt-1 h-[216px] w-full items-center md:mt-0 md:max-w-[500px] md:items-start md:p-4"
            gap="2"
          >
            <Typography.H3 className="mr-auto underline md:mr-0">
              {title[language]}
            </Typography.H3>
            <Box gap="2" height="auto">
              {tags?.map((tag) => (
                <Tag key={tag}>{truncateString(tag, MAX_TAG_LENGTH)}</Tag>
              ))}
            </Box>

            <Box direction="col" justify="between">
              <Typography.P className="w-[300px] overflow-hidden overflow-ellipsis md:w-full">
                {truncatedDescription}
              </Typography.P>
              <time dateTime={date} className="text-muted-foreground underline">
                {dateTime}
              </time>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
