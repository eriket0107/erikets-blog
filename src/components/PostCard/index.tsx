import Image from "next/image";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { PostType } from "@/interfaces/posts";

interface IPostCard {
  post: PostType;
}

export const PostCard = ({ post }: IPostCard) => {
  const { description, imgSrc, title, date } = post;
  return (
    <Box
      direction="col"
      gap="4"
      width="auto"
      justify="center"
      className="m-0 snap-center md:m-auto"
    >
      <Box className="group cursor-pointer flex-col rounded-sm transition-all transition-discrete md:flex-row md:hover:scale-99 md:hover:opacity-85 md:hover:shadow-md/20">
        <Box
          height={"200px"}
          className="relative min-w-[300px] overflow-hidden rounded-t-sm md:w-[300px] md:rounded-l-sm"
        >
          <Image
            fill
            src={imgSrc}
            objectFit="cover"
            alt=""
            className="transition-all transition-discrete md:group-hover:scale-115"
          />
        </Box>
        <Box
          direction="col"
          className="mt-4 h-[200px] w-full items-center p-2 md:mt-0 md:max-w-[500px] md:items-start md:p-4"
        >
          <Typography.H3 className="mr-auto underline md:mr-0">
            {title}
          </Typography.H3>
          <Typography.Muted>
            {new Date(date).toLocaleDateString()}
          </Typography.Muted>
          <Typography.P className="h-auto w-[300px] overflow-hidden overflow-ellipsis md:w-full">
            {description}
          </Typography.P>
        </Box>
      </Box>
    </Box>
  );
};
