import { Dispatch, SetStateAction } from 'react';
import { HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationProps = {
  page: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ page, pageCount, setPage }: PaginationProps) => {
  return (
    <HStack m='4' justify='center'>
      <IconButton
        aria-label='Previous Page'
        icon={<Icon as={FaChevronLeft} />}
        disabled={page <= 1}
        onClick={() => setPage((prevPage: number) => prevPage - 1)}
      />
      <Text>
        {page} of {pageCount}
      </Text>
      <IconButton
        aria-label='Next Page'
        icon={<Icon as={FaChevronRight} />}
        disabled={page >= pageCount}
        onClick={() => setPage((prevPage: number) => prevPage + 1)}
      />
    </HStack>
  );
};

export default Pagination;
