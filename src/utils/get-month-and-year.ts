export const getMonthAndYear = (date: string): string => {
  const month = new Date(date).getUTCMonth() + 1;
  const year = new Date(date).getUTCFullYear();

  return `${month}/${year}`;
};