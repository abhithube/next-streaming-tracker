export const POSTER_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/original`;
export const LOGO_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/original`;
export const BACKDROP_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/w1920_and_h800_multi_faces`;

export const SUPPORTED_PROVIDERS: number[] = `${process.env.NEXT_PUBLIC_SUPPORTED_PROVIDERS}`
  .split(',')
  .map((str) => parseInt(str));
