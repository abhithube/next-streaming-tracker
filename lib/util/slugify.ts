import slugify from 'slugify';

export default (id: number, name: string) => {
  return `${id}-${slugify(name, {
    lower: true,
    strict: true,
    locale: 'us',
  })}`;
};
