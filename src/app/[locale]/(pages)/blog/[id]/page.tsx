import { getPostById } from "@/actions/posts";
import { Box } from "@/components/Box";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Typography } from "@/components/Typography";
import { LanguageType } from "@/interfaces/posts";
import Image from "next/image";

const Post = async ({
  params,
}: {
  params: { id: string; locale: LanguageType };
}) => {
  const { id, locale: language } = await params;
  const post = await getPostById(id);

  return (
    <>
      <ScrollProgress />

      <Box
        justify="center"
        direction="col"
        align="center"
        padding="4"
        width="600"
      >
        <Typography.H2>{post?.title[language]}</Typography.H2>

        <Image
          src={post.imgSrc}
          width={600}
          height={400}
          alt={post.title[language]}
          className="rounded-t-sm"
        />
        <Box
          className="max-w-[600px] pt-4"
          direction="col"
          gap="2"
          justify="center"
          align="center"
        >
          <Typography.Muted>{post.date}</Typography.Muted>
          <Typography.P className="text-base">
            {post?.description[language]}
          </Typography.P>
          <Typography.P className="text-lg">
            {post?.text?.[language]}
          </Typography.P>
        </Box>
      </Box>
    </>
  );
};

export default Post;
