import { HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationProps = {
  page: number;
  pageCount: number;
};

const Pagination = ({ page, pageCount }: PaginationProps) => {
  const router = useRouter();
  return (
    <HStack m='4' justify='center'>
      <IconButton
        aria-label='Previous Page'
        icon={<Icon as={FaChevronLeft} />}
        disabled={page <= 1}
        onClick={() =>
          router.push(
            { query: { ...router.query, page: page - 1 } },
            undefined,
            {
              shallow: true,
            }
          )
        }
      />
      <Text>
        {page} of {pageCount}
      </Text>
      <IconButton
        aria-label='Next Page'
        icon={<Icon as={FaChevronRight} />}
        disabled={page >= pageCount}
        onClick={() =>
          router.push(
            { query: { ...router.query, page: page + 1 } },
            undefined,
            {
              shallow: true,
            }
          )
        }
      />
    </HStack>
  );
};

export default Pagination;
