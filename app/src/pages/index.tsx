import Head from 'next/head'
import { Layout } from '@/components/Layout';

export default function Index() {

  return (
    <Layout>
      <Head>
        <title>Example</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='main'></main>
    </Layout>
  )
}
