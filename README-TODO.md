# Project TODO List

Remember - you can't modify the contract once it's deployed. Use the database for almost everything. The blockchain will just be used to record ownership.

Create a new section - nfts

Old market section will be used by admin.

Fix MetaMask closing before transactions are complete on the create-item.js page. Need a spinner or some type of indicator.

Need to take out modal request on everything but the create_item page.

ETH USD Converters

Fix null return on no assets.

Should we allow outside NFTs to be listed? Too much clutter?

Payments - figure that out..

DB Tables

CONTRACT
id
asset_type # ERC-721, etc..
name
address
token_name
token_symbol
network
scanurl
owner_address
owner_user_id
description
notes
date
created_by
deleted

ASSET
id
asset_type # ERC-721, etc..
token_id
token_name
token_symbol
contract_address
owner_address
owner_id
network
etherscan_url
description
notes
date
created_by
for_sale
display_in_gallery
deleted

Only use the market to transfer ownership

TRANSACTIONS
id
transaction_type //select box // sale, delist, list,
contract_id
contract_address
token_id
market_id // just handle all the market in the DB
market_address // maybe leave the market out of this
buyer_id
buyer_address
seller_id
seller_address
sale_price
fees
date
confirmed
description
notes
list_for_sale
sold
delist
deleted
