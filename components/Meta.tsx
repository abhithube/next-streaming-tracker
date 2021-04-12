import Head from 'next/head';

type Props = {
  title?: string;
};

const Meta = ({ title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title ? `${title} | StreamDB` : 'StreamDB'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Meta;
