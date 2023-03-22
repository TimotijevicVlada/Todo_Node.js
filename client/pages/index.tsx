import Head from 'next/head'
import Home from '@/components/Home/Home';


export default function HomePage() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Home />
      </div>
    </>
  )
}
