# SPCAPV Digital Tienda

# By John Dunnicliffe

My first public project on Github. I have a lot of private projects. I made it public because there is not enough web 3 material out there to help us. It all works as it stands. I'm just starting this project. React is new for me. Expect to see some ugly code. There is a lot more to do.

Project basics already setup:

- Nextjs
- Tailwind
- NextAuth - Credentials and Github
- Hardhat & Web3
- NFT Market (basic at this point)
- Prisma DB with Users and Notes

* Ethereum or Polygon - or other EVM layer 2
* Planning to accept credit cards, PayPal, and crypto.
* It's about having fun and supporting a worthy cause and getting a chance to learn some new technology.

I followed Nader Dabit's tutorial to get the basic project setup.  
https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb

I used this version of NextAuth - Version 3:  
https://next-auth.js.org/v3/providers/credentials

Setup Prisma - I used the following guide:  
https://vercel.com/guides/nextjs-prisma-postgres

Be careful and use the versions specified in package.json I had problems with a newer version of ipfs-http-client and maybe one or two other packages.

Install - npm install

Setup Hardhat - Nader's guide

Setup Prisma - run the migrations - npx prisma migrate

Setup an Infura Account or similar - You'll need Infura for IPFS and Ropsten

Setup a Github OAuth Account or other OAuth choices

Create a .env file with all secrets

Create a .secret file - see Nader's guide

Create a .infura file

Follow Nader's guide to setup Hardhat

---

.env file entries

JWT_SECRET=INp8IvdIyeMlp7ftFGoA61DdBglwwSqnXJZkgz8PSnw
WEB3_NETWORK=ropsten

# Infura IPFS -- example account numbers

# Used on the create-item page for IPFS

NEXT_PUBLIC_IPFS_PROJECTID=2766eg457772
NEXT_PUBLIC_IPFS_PROJECTSECRET=2782656twegqw57

# This example JRPC is on the market index page - to fetch NFTs

NEXT_PUBLIC_ROPSTEN_JRPC=https://ropsten.infura.io/v3/736gdge452yhnjs

# DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

DATABASE_URL="file:./dev.db"

# Example Github account info for OAuth user login

GITHUB_ID=08sfhh665433
GITHUB_SECRET=90833jduwue77w33uudjllewwee

# NEXTAUTH_URL=http://localhost:3000/api/auth

NEXTAUTH_URL=http://localhost:3000

End of .env file entries

---

You will need to deploy your Hardhat contracts. Test locally first. It all works!

Some Background:

I'm retired after 30 years as a software engineer (University of Hawaii). I started on MSDOS. Last few years have been Rails, Python, and now I'm learning React. Just started React in August 2021.

I got involved with the SPCA Puerto Vallarta through a good friend. On August 28, 2021, Hurricane Nora destroyed the SPCA Shelter. No animals were lost, but the facility was wiped out. This site might help us raise funds (in a small way) to help us rebuild.

Site Features Planned:

- Donate cash or crypto to SPCAPV
- Create your own NFTs - free to create if you donate above a certain amount of money
- Show your NFTs in our Gallery
- List your NFTs for sale
- Auction off certain select NFTs
- We have +20,000 followers. There will be some activity.
- Make it fun! The site should be interesting for our followers even if they don't know annything about crypto.

All sale proceeds go to SPCAPV rebuilding project. It's for the dogs!

The site will be user friendly - crypto or traditional.

I'm not in a hurry. There is a lot of work to be done yet. My goal is to finish this when ETH POS roles out. Looking for reasonable fees.

Users can create their own NFTs and sell or just display them in our gallery. If they donate a certain amount of money, we will allow them to create X number of NFTs. They can sell them on the site or not. Maybe we will have auctions. SPCAPV keeps all the money. It's not about investing.

Almost no users will know how to use Crypto to buy anything on our site.

If they buy with CC or PayPal we will hold for them until they get a crypto address.
