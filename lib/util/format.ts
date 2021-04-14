const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const formatCurrency = (data: number) => {
  return currencyFormatter.format(data);
};

export const formatRuntime = (data: number) => {
  return `${Math.floor(data / 60)}h ${data % 60}m`;
};

export const formatRating = (data: string) => {
  switch (data) {
    case 'PG-13':
      return 'yellow';
    case 'R':
      return 'red';
    case 'PG':
      return 'green';
    case 'G':
      return 'blue';
    case 'NC-17':
      return 'purple';
    default:
      return 'gray';
  }
};

export const formatReleaseYear = (data: string) => {
  return new Date(data).getFullYear();
};

export const formatReleaseDate = (data: string) => {
  return new Date(data).toLocaleDateString();
};
