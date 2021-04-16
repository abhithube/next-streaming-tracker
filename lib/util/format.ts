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
  const hour = Math.floor(data / 60);
  const min = data % 60;

  return hour > 0 ? `${hour}hr ${min}min` : `${min}min`;
};

export const formatMovieRating = (data: string) => {
  switch (data) {
    case 'PG-13':
      return 'yellow';
    case 'R':
      return 'red';
    case 'PG':
    case 'G':
      return 'green';
    case 'NC-17':
      return 'purple';
    default:
      return 'gray';
  }
};

export const formatTVRating = (data: string) => {
  switch (data) {
    case 'TV-MA':
      return 'red';
    case 'TV-14':
      return 'yellow';
    case 'TV-PG':
    case 'TV-G':
    case 'TV-Y7':
    case 'TV-Y':
      return 'green';
    default:
      return 'gray';
  }
};

export const formatReleaseYear = (data: string) => {
  return new Date(data).getFullYear();
};

export const formatReleaseDate = (data: string) => {
  return new Date(data).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export const formatProviders = (data: any[]) => {
  return data.sort((a, b) => {
    if (a.id > b.id) return 1;
    else return -1;
  });
};
