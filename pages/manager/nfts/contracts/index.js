import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import splogo from "../../../../public/images/spca-pv1.gif";
import Link from "next/link";
import prisma from "../../../../lib/prisma.ts";

//og from "../../../../public"

export default function Page({ data }) {
  const [session, loading] = useSession();

  return (
    <div>
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 p-4 w-full">
            <div className="mt-0">
              <Image
                className="rounded-lg"
                src={splogo}
                alt="logo"
                width={150}
                height={127}
              />
            </div>
            <p>&nbsp;</p>
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
              <Link href="/manager/nfts/contracts">Contracts</Link>
              <Link href="/manager/nfts/contracts/addContract">
                Add New Contract
              </Link>
              <Link href="/manager/nfts/tokens">Tokens</Link>
              <Link href="/manager/nfts/transactions">Transactions</Link>
              <Link href="/manager/nfts/payments">Payments</Link>
            </ul>
          </div>
        </div>
        <main
          role="main"
          className="w-3/4 mr-10 h-full flex-grow p-3 overflow-auto"
        >
          <p className="font-black text-4xl">Contract Administration</p>
          <p>&nbsp;</p>
          <p>Contracts - Add, Edit, Details, Delete</p>
          <p>&nbsp;</p>
          <h2>Contracts</h2>
          <ul>
            {data.map((item) => (
              <li key="item.id">
                <b>{item.name}</b>
                <br />
                {item.tokenSymbol}
                <br />
                <p>ID: {item.id}</p>
                <div className="page-nav">
                  <Link
                    href={`/manager/nfts/contracts/detailsContract/${item.id}`}
                  >
                    Details
                  </Link>
                </div>
                <br />
                &nbsp;
              </li>
            ))}
          </ul>
          <hr />
          <p className="font-black text-3xl">
            This section will be developed under a new git branch before it is
            released. The branch will be named nftdatabase.
          </p>
          <p>&nbsp;</p>

          <h2>Database Contract Fields</h2>
          <ul>
            <li>id</li>
            <li>asset_type # ERC-721, etc..</li>
            <li>name</li>
            <li>address</li>
            <li>token_name</li>
            <li>token_symbol</li>
            <li>network</li>
            <li>scanurl</li>
            <li>owner_address</li>
            <li>owner_user_id</li>
            <li>description</li>
            <li>notes</li>
            <li>date</li>
            <li>created_by</li>
            <li>deleted</li>
          </ul>
        </main>
      </div>
      <footer className="bg-yellow-100 mt-auto font-black text-center">
        SPCAPV Footer!!
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const contracts = await prisma.contract.findMany();

  return {
    props: { data: contracts },
  };
}
