import Link from "next/link";
import Head from "next/head";
//import prisma from "../../lib/prisma.ts";

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
}

export default function Success({ id }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>NFT Success</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <Link href="/oz/sendNftOnly">Add New NFT</Link>
        </div>
        <p>&nbsp;</p>
        <h1 className="text-3xl font-black">SUCCESS !</h1>
        <p>&nbsp;</p>
        <h1 className="text-3xl font-black">Token ID: &nbsp; {id}</h1>
      </main>

      <footer className="text-center font-bold text-xl">
        <b>Powered by John Dunnicliffe</b>
      </footer>
    </div>
  );
}
