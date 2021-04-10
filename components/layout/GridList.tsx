import { ReactElement } from 'react';

type Props = {
  columns: number;
  children: ReactElement[];
};

const GridList = ({ columns, children }: Props) => {
  return (
    <div className='grid'>
      {children}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(${columns}, 1fr);
          gap: 32px;
        }
      `}</style>
    </div>
  );
};

export default GridList;
