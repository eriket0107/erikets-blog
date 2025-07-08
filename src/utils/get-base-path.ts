export const getBasePath = ({ href, pathname }: { href: string, pathname: string }): boolean => {
  const basePathName = pathname?.match(/^\/[^\/]+/)?.[0] ?? "/";
  return basePathName === href;
}