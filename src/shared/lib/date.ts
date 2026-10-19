export function formatDate(value: string, year = false) {
  return new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    ...(year ? { year: 'numeric' as const } : {}),
  });
}
