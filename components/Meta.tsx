import Head from 'next/head';

type MetaProps = { title?: string };

const Meta = ({ title }: MetaProps) => {
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
