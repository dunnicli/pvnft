import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

function Navbar() {
  const [session, loading] = useSession();
  return (
    <nav className="header">
      <h1 className="logo">
        <Link href="/">PVAR</Link>
      </h1>
      <ul className={`main-nav ${!session && loading ? "loading" : "loaded"}`}>
        {session && (
          <li>
            <Link href={`/profile/myCollection/${session.user.uid}`}>
              <a>My Collection</a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/gallery">
            <a>NFT Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/pay">
            <a>Donate</a>
          </Link>
        </li>

        {session && (
          <li>
            <Link href={`/profile/${session.user.uid}`}>
              <a>
                Dashboard: {session.user.name} {session.user.admin && "**"}
              </a>
            </Link>
          </li>
        )}
        {session && session.user.admin && (
          <li>
            <Link href="/manager">
              <a>Manager</a>
            </Link>
          </li>
        )}

        <li> &nbsp;</li>

        {!loading && !session && (
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        )}

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
