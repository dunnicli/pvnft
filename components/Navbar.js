import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

function Navbar() {
  const [session, loading] = useSession();
  return (
    <nav className="header">
      <h1 className="logo">
        <Link href="/">SPCA PV</Link>
      </h1>
      <ul className={`main-nav ${!session && loading ? "loading" : "loaded"}`}>
        {session && (
          <li>
            <Link href="/">
              <a>{session.user.name}</a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/manager">
            <a>Manager</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a>NFT Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link href="/notes">
            <a>Notes</a>
          </Link>
        </li>

        <li> &nbsp;</li>

        {!loading && !session && (
          <li>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <button
              className="signout button text-blue font-medium m-1 p-1"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Do you really want to Sign Out?"
                );
                if (confirmBox === true) {
                  signOut();
                }
              }}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
