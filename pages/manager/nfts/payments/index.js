import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
//import shelter from "../../../../public/images/shelter-river.png";
import splogo from "../../../../public/images/spca-pv1.gif";
import Link from "next/link";
//import mydog from "../../../../public"

export default function Page() {
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
          <p className="font-black text-4xl">Payments Administration</p>
          <p>&nbsp;</p>
          <p>Payments - Add, Edit, Details, Delete</p>
          <p>&nbsp;</p>
          <p className="font-black text-3xl">
            This section will be developed under a new git branch before it is
            released. The branch will be named nftdatabase.
          </p>
          <p>&nbsp;</p>
          <h2>Payment DB Fields</h2>
          <ul>
            <li>id</li>
            <li>owner_user_id</li>
            <li>description</li>
            <li>notes</li>
            <li>date</li>
            <li>created_by</li>
            <li>deleted</li>
            <li>and more...</li>
          </ul>
        </main>
      </div>
      <footer className="bg-yellow-100 mt-auto font-black text-center">
        SPCAPV Footer!!
      </footer>
    </div>
  );
}
