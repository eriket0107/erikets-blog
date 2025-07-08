export const truncateString = (text: string, size: number) =>
  text?.length > size
    ? text.substring(0, size) + "..."
    : text;
