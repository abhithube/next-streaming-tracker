import { chakra } from '@chakra-ui/react';
import Image from 'next/image';

export default chakra(Image, {
  shouldForwardProp: prop =>
    ['src', 'alt', 'width', 'height', 'loading'].includes(prop),
});
