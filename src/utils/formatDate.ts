const shortDateFormatter = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' });

const dateTimeFormatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatShortDate(date: Date) {
  return shortDateFormatter.format(date);
}

export function formatDateTime(date: Date) {
  return dateTimeFormatter.format(date);
}
