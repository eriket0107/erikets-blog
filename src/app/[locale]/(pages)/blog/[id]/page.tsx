import { LanguageType } from "@/interfaces/posts";
import { Post as PostTemplate } from "@/pages/Post";

const Post = async ({
  params,
}: {
  params: { id: string; locale: LanguageType };
}) => {
  const { id, locale: language } = await params;
  return <PostTemplate id={id} language={language} />;
};

export default Post;
