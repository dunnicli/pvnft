import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

function Navmarket() {
  const [session, loading] = useSession();
  return (
    <nav className="flex justify-center">
      <h1 className="logo">
        <Link href="/">SPCA PV</Link>
      </h1>
      <ul
        className={`flex justify-center ${
          !session && loading ? "loading" : "loaded"
        }`}
      >
        <li>
          <Link href="/market">
            <a>NFT Market</a>
          </Link>
        </li>
        <li>
          <Link href="/market/create-item">
            <a>Create NFT</a>
          </Link>
        </li>
        <li>
          <Link href="/market/my-assets">
            <a>My Assets</a>
          </Link>
        </li>

        <li>
          <Link href="/market/creator-dashboard">
            <a>Dashboard</a>
          </Link>
        </li>

        <li> &nbsp;</li>
      </ul>
    </nav>
  );
}

export default Navmarket;
