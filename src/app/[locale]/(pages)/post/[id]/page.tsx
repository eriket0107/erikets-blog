import { LanguageType } from "@/interfaces/posts";
import { Post as PostLayout } from "@/layouts/Post";

const Post = async ({
  params,
}: {
  params: Promise<{ id: string; locale: LanguageType }>;
}) => {
  const { id, locale: language } = await params;
  return <PostLayout id={id} language={language} />;
};

export default Post;
