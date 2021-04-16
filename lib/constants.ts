import { Provider } from './types';

export const IMAGE_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/original`;
export const BACKDROP_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/w1920_and_h800_multi_faces`;

export const SUPPORTED_PROVIDERS: Provider[] = [
  { id: 8, name: 'Netflix' },
  { id: 9, name: 'Amazon Prime Video' },
  { id: 15, name: 'Hulu' },
  { id: 337, name: 'Disney+' },
  { id: 384, name: 'HBO Max' },
];
