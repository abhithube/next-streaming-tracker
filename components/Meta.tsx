import Head from 'next/head';

type MetaProps = {
  title: string;
  description: string;
};

const Meta = ({ title, description }: MetaProps) => {
  return (
    <Head>
      <title>{title + (title === 'Trackit' ? '' : ' | Trackit')}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Meta;
