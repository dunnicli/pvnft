import Link from "next/link";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import prisma from "../../../lib/prisma.ts";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const token = await prisma.token.findUnique({
    where: { id: parseInt(id) },
    include: {
      ownerUser: {
        select: { name: true, id: true, email: true },
      },
      contract: {
        select: {
          contractName: true,
          tokenName: true,
          tokenType: true,
          tokenSymbol: true,
          network: true,
          scanUrl: true,
        },
      },
    },
  });

  return {
    props: {
      token,
    },
  };
}

async function deleteToken(id) {
  await fetch(`/api/notess/noteDelete/${id}`, {
    method: "DELETE",
  });
  Router.push("/gallery");
}

export default function NftDetails(props) {
  //const router = useRouter();
  const { token } = props;

  return (
    <div>
      <Head>
        <title>{token.metaName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <div className="flex-auto w-1/2 p-10">
          <p>&nbsp;</p>
          <h1>NFT Name: &nbsp; {token.metaName}</h1>
          <p>&nbsp;</p>

          <div className="border shadow rounded-xl overflow-hidden">
            <a
              target="_blank"
              href={`${token.metaImageUrl}`}
              alt="Open image in a new tab"
              title="Open image in a new tab"
              rel="noopener noreferrer"
            >
              <img src={token.metaImageUrl} className="rounded" />
            </a>
            <div className="p-4 bg-black">
              <p className="text-2xl font-bold text-white">
                Description - {token.metaDescription} Eth
              </p>
            </div>
          </div>
          <p>&nbsp;</p>
          <hr />
          <p>&nbsp;</p>
        </div>

        <div className="flex-auto w-1/2 p-5">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>
            Name:&nbsp; &nbsp; <b>{token.metaName}</b>
          </p>
          <p>
            Token ID:&nbsp; &nbsp; <b>{token.tokenId}</b>
          </p>
          <p>
            Display?:&nbsp; &nbsp; <b>{token.display}</b>
          </p>
          <p>
            For Sale:&nbsp; &nbsp; <b>{token.forSale}</b>
          </p>
          <p>
            Sale Price:&nbsp; &nbsp; <b>{token.salePrice}</b>
          </p>
          <p>
            Token Type:&nbsp; &nbsp; <b>{token?.contract?.tokenType}</b>
          </p>

          <p>
            Token Group Name:&nbsp; &nbsp; <b>{token?.contract?.tokenName}</b>
          </p>
          <p>
            Token Symbol:&nbsp; &nbsp; <b>{token?.contract?.tokenSymbol}</b>
          </p>
          <p>
            Network:&nbsp; &nbsp; <b>{token?.contract?.network}</b>
          </p>
          <p>
            Etherscan:&nbsp; &nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="Open link in a new tab"
              href={`${token?.contract?.scanUrl}`}
            >
              View Contract on Blockchain
            </a>
          </p>

          <p className="truncate ...">
            Token Owner Address:&nbsp; &nbsp; <b>{token.ownerAddress}</b>
          </p>
          <p>
            Owner(db):&nbsp; &nbsp;{" "}
            <b>
              {token?.ownerUser?.name}&nbsp; &nbsp;
              {token?.ownerUser?.email}
            </b>
          </p>
          <p>
            Meta Description:&nbsp; &nbsp; <b>{token.metaDescription}</b>
          </p>
          <p className="truncate ...">
            Image URL IPFS:&nbsp; &nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="Open link in a new tab"
              href={`${token?.metaImageUrl}`}
            >
              <b>{token.metaImageUrl}</b>
            </a>
          </p>
          <p className="truncate ...">
            JSON URI:&nbsp; &nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="Open link in a new tab"
              href={`${token?.tokenJsonUri}`}
            >
              <b>{token.tokenJsonUri}</b>
            </a>
          </p>

          <p>
            Notes:&nbsp; &nbsp; <b>{token.notes}</b>
          </p>
          <p>
            Created At:&nbsp; &nbsp; <b>{token.createdAt.toLocaleString()}</b>
          </p>
          <p>
            Created By:&nbsp; &nbsp; <b>{token.createdBy}</b>
          </p>
          <p>
            Updated At:&nbsp; &nbsp; <b>{token.updatedAt.toLocaleString()}</b>
          </p>
          <p>
            Updated By:&nbsp; &nbsp; <b>{token.updatedBy}</b>
          </p>
          <p>
            Deleted?:&nbsp; &nbsp; <b>{token.deleted}</b>
          </p>
          <p>&nbsp;</p>
          <div className="page-nav">
            <Link href={`/manager/nfts/tokens/editToken/${token.id}`}>
              Edit Token Info
            </Link>
            - &nbsp;
            <button
              className="delete button"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Do you really want to delete this Token?"
                );
                if (confirmBox === true) {
                  deleteToken(token.id);
                }
              }}
            >
              Delete
            </button>
            <p>&nbsp;</p>
            <Link
              href={`/manager/nfts/contracts/detailsContract/${token.contractId}`}
            >
              <a>View Contract</a>
            </Link>
            <p>&nbsp;</p>
            <p>
              <Link href="/gallery">
                <a>Back to NFT Gallery</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}