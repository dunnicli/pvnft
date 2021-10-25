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
          <p className="font-black text-4xl">
            Tokens - NFTs - Assets Administration
          </p>
          <p>&nbsp;</p>
          <p>Tokens - Add, Edit, Details, Delete</p>
          <p>&nbsp;</p>
          <p className="font-black text-3xl">
            This section will be developed under a new git branch before it is
            released. The branch will be named nftdatabase.
          </p>
          <p>&nbsp;</p>
          <h2>Database Token Assets Fields</h2>
          <ul>
            <li>id</li>
            <li>asset_type # ERC-721, etc..</li>
            <li>meta_fields *url, name, desc, image_url</li>
            <li>asset_name</li>
            <li>asset_address</li>
            <li>contract_address</li>
            <li>asset_symbol</li>
            <li>asset_network</li>
            <li>asset_scanurl</li>
            <li>owner_address</li>
            <li>owner_user_id</li>
            <li>asset_description</li>
            <li>display_in_gallery</li>
            <li>for_sale</li>
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
