import { Container, Flex, Heading, Text } from '@chakra-ui/react';

const About = () => {
  return (
    <Container maxW='80%' py='8' minH='100%'>
      <Flex direction='column' align='flex-start'>
        <Heading mb='4'>About</Heading>
        <Text mb='8'>
          Trackit! is a streaming tracker. It displays up-to-date information
          about the most popular movies and television shows and where they can
          be streamed online. Users can filter by specific genres or by the
          supported providers (Netflix, Amazon Prime Video, Hulu, Disney+, and
          HBO Max).
        </Text>
        <Text>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </Text>
      </Flex>
    </Container>
  );
};

export default About;
