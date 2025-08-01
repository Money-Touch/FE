export function isToday(dateStr: string): boolean {
  const today = new Date();
  const target = new Date(dateStr);

  return (
    today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate()
  );
}
