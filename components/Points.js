import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

function Points({ user }) {
  return (
    <div>
      <h1>Total Points:</h1>
      <p>&nbsp;</p>
      <p>{user.name}</p>
      <p>&nbsp;</p>
    </div>
  );
}

export default Points;
