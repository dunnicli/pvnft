import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
//import shelter from "../../../public/images/shelter-river.png";
import splogo from "../../../public/images/spca-pv1.gif";
import Link from "next/link";
//import mydog from "../../../public"

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
          <p className="font-black text-4xl">NFT Administration</p>
          <p>&nbsp;</p>
          <p>Contracts, Tokens, Transactions, and Payments.</p>

          <p>&nbsp;</p>
          <p className="font-black text-3xl">
            This section will be developed under a new git branch before it is
            released. The branch will be named nftdatabase.
          </p>
          <p>&nbsp;</p>
          <p>
            {" "}
            Filler text.. This certificate verifies that the blockchain address
            associated with this file is the owner of the connected NFT. We
            thank you for your support. If you have any questions about this NFT
            or require further verification, please contact us at
            spcapv.asssist@gmail.com.
          </p>
        </main>
      </div>
      <footer className="bg-yellow-100 mt-auto font-black text-center">
        SPCAPV Footer!!
      </footer>
    </div>
  );
}
