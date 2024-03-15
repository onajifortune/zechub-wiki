
interface Searcher {
    name: string
    desc: string
    url: string
}

export const searcher: Searcher[] = [
    { name: 'Developer Resources', desc: 'Broad Overview of how Blockchains & Zcash works', url: '/start-here/developer-resources' },
    { name: 'Development Fund', desc: 'Zcash is a unique blockchain protocol because it is self-funded.', url: '/start-here/development-fund' },
    { name: 'New User Guide', desc: 'This guide will walk you through getting onboarded as a Zcash user and ZEC holder.', url: '/start-here/new-user-guide' },
    { name: 'Using this Wiki', desc: 'Some of this might be overwhelming. We get it! There is a lot of information here.', url: '/start-here/using-this-wiki' },
    { name: 'What is ZEC', desc: 'ZEC is a digital currency that is based on the Zcash blockchain.', url: '/start-here/what-is-zec-and-zcash' },
    { name: 'What is ZecHub', desc: 'ZecHub is a decentralized education hub for Zcash.', url: '/start-here/what-is-zechub' },
    { name: 'ZEC Use Cases', desc: 'People use ZEC to transact efficiently and safely with low fees.', url: '/start-here/zec-use-cases' },
    { name: 'Zcash Basics', desc: `Zcash's monetary base is the same as the Bitcoin fixed supply of 21 million ZEC currency units.`, url: '/start-here/zcash-monetary-policy' },
    { name: 'Zcash Resources', desc: 'There are a number of resources that help users understand Zcash.', url: '/start-here/zcash-resources' },
    { name: 'Zcash Block Explorers', desc: 'Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain.', url: '/using-zcash/wallets' },
    { name: 'Buying Zcash', desc: 'In order to use Zcash in private shielded transactions, you need to have ZEC', url: '/using-zcash/buying-zec' },
    { name: 'Dex List', desc: 'Listed above are non-custodial exchanges', url: '/using-zcash/dex-list' },
    { name: 'Faucets', desc: 'Faucets are services that dispense small amounts of cryptocurrency for free.', url: '/using-zcash/faucets' },
    { name: 'Memos', desc: 'When sending a Z2Z (shielded-to-shielded) transaction...', url: '/using-zcash/memos' },
    { name: 'Non Custodial Exchanges', desc: 'Listed above are non-custodial exchanges that enable you to effortlessly obtain and trade Zcash independently', url: '/using-zcash/non-custodial-exchanges' },
    { name: 'Value Pools', desc: 'There are currently 4 value pools in Zcash.', url: '/using-zcash/shielded-pools' },
    { name: 'Transactions', desc: 'ZEC is primarily used for payments...', url: '/using-zcash/transactions' },
    { name: 'Gemini Exchange', desc: 'How to buy ZEC in Gemini', url: '/tutorials/buy-zec-in-gemini' },
    { name: 'Full Node Tutorials', desc: 'Full Nodes validate transparent and shielded transactions on the Network', url: '/tutorials/full-node-tutorials' },
    { name: 'Shielding ZEC', desc: 'This video was created to show users how to shield their ZEC.', url: '/tutorials/shielding-zec' },
    { name: 'Wallet Tutorials', desc: 'Below are a list of wallet tutorials that can help you get started with ZEC.', url: '/tutorials/wallet-tutorials' },
    { name: 'Blockchain Explorers', desc: 'In the traditional business world every transaction includes a receipt for proof of purchase', url: '/guides/blockchain-explorers' },
    { name: 'Raspberry Pi 4', desc: 'The purpose of this guide is to help educate Zcashers...', url: '/guides/raspberry-pi-4-full-node' },
    { name: 'Using ZEC, privately', desc: 'As it currently stands, there are two addresses and transaction types in Zcash, shielded and transparent.', url: '/guides/using-zec-privately' },
    { name: 'Zcash in DeFi', desc: 'Zcash users are capable of leveraging Ethereum smart contracts and wider DeFi applications...', url: '/guides/using-zec-in-defi' },
    { name: 'Visualizing Zcash Addresses', desc: `If you're learning about Zcash for the first time you will immediately.`, url: '/guides/visualizing-zcash-addresses' },
    { name: 'Improvement Proposals', desc: 'One of the most intriguing aspects of Decentralized Autonomous Organizations...', url: '/guides/zcash-improvement-proposals' },
    { name: 'Zero Knowledge vs Decoy', desc: 'Certain crypto projects have gained recognition for their privacy-centric approaches.', url: '/guides/zero-knowledge-vs-decoys' },
    { name: 'Zgo Payment Processor', desc: 'Even though Payment processors are known for their services to facilitate transactions...', url: '/guides/zgo-payment-processor' },
    { name: 'FROST', desc: 'Flexible Round-Optimized Schnorr Threshold Signatures', url: '/zcash-tech/frost' },
    { name: 'Halo', desc: 'Halo is a trustless, recursive zero-knowledge proof ZKP discovered by Sean Bowe at Electric Coin Co.', url: '/zcash-tech/halo' },
    { name: 'Lightwallet Nodes', desc: 'Proofs are the basis for all mathematics.', url: '/zcash-tech/lightwallet-nodes' },
    { name: 'Viewing Keys', desc: 'Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain.', url: '/zcash-tech/viewing-keys' },
    { name: 'Shielded Assets', desc: 'Zcash Shielded Assets ZSA are a proposed improvement to the the Zcash protocol that would enable the creation, transfer, and burn of custom assets on the Zcash chain.', url: '/zcash-tech/zcash-shielded-assets' },
    { name: 'Wallet Syncing', desc: 'To understand how warp sync works, let me explain a bit more about Zcash.', url: '/zcash-tech/zcash-wallet-syncing' },
    { name: 'ZK-SNARKS', desc: 'Succinct Non-Interactive Argument of Knowledge', url: '/zcash-tech/zk-snarks' },
    { name: 'Electric Coin Company', desc: 'We build and support Zcash to drive greater freedom and opportunity for everyone.', url: '/zcash-organizations/electric-coin-company' },
    { name: 'Shielded Labs', desc: 'Shielded Labs was founded as a Swiss Association in December 2022', url: '/zcash-organizations/shielded-labs' },
    { name: 'Zcash Community Grants', desc: 'The Zcash Community Grants program funds independent teams entering the Zcash ecosystem', url: '/zcash-organizations/zcash-community-grants' },
    { name: 'Zcash Foundation', desc: `The essence of privacy itself is being able to choose what is or isn't shared with others.`, url: '/zcash-organizations/zcash-foundation' },
    { name: 'ZFAV Club Background', desc: 'Supported by The Zcash Foundation this ambitious grassroots project aims...', url: '/zfav-club/av-club-background' },
    { name: 'Guides for Creators', desc: 'Guides for creators...', url: '/zfav-club/guides-for-creators' },
    { name: 'Youtube Channel', desc: 'Youtube Channel...', url: '/zfav-club/youtube-channel' },
    { name: '2FA Hardware Devices', desc: 'Data security and privacy are critical concerns for individuals and businesses alike.', url: '/privacy-tools/2fa-hardware-devices' },
    { name: 'Graphene OS', desc: 'GrapheneOS is a non-profit, open-source project dedicated to enhancing privacy and security on mobile devices while maintaining compatibility with Android apps.', url: '/privacy-tools/grapheneos' },
    { name: 'Namada Protocol', desc: 'Namada Protocol serves as a Layer 1 platform based on proof-of-stake consensus, designed to provide interchain asset-agnostic privacy.', url: '/privacy-tools/namada-protocol' },
    { name: 'Secure Messengers', desc: 'In view of the secure messengers, end-to-end encryption exists to be a security method that keeps a conversation secured.', url: '/privacy-tools/secure-messengers' },
    { name: 'Tor & I2P Technologies', desc: 'Tor is a proxy tool that ustilizes the Tor network to establish connections for applications.', url: '/privacy-tools/tor-and-i2p' },
    { name: 'VPN & dVPN', desc: 'Virtual Private Networks VPNs and decentralized VPNs dVPNs play a crucial role in safeguarding your online activities and data.', url: '/privacy-tools/vpn-and-dvpn' },
    { name: 'Web Browsers', desc: 'When selecting a web browser there are a few things to keep in mind: Security vulnerabilities and exploits are usually discovered regularly.', url: '/privacy-tools/web-browsers' },
    { name: 'Social Media Data Collection', desc: 'Currently, it is difficult to find a person who is not exposed to the reach of social networks.', url: '/research/social-media-data-collection' },
    { name: 'Zero Knowledge Asset Platforms', desc: 'Asset Platforms...', url: '/research/zk-shielded-asset-platforms' },
    { name: 'FAQ', desc: 'A list of topics with the most frequently asked questions about Zcash.', url: '/glossary-and-faqs/faqs' },
    { name: 'Gallery', desc: 'All our collection from Zechub', url: '/glossary-and-faqs/gallery' },
    { name: 'The Zcash Library', desc: 'Key Terms & Definitions related to Zcash', url: '/glossary-and-faqs/zcash-library' },
    { name: 'Contributing Guide', desc: `If you're a member of the Zcash community, and want to contribute building ZecHub...`, url: '/contribute/contributing-guide' },
    { name: 'Help Build ZecHub', desc: "If you're a member of the Zcash community, and want to contribute building ZecHub, there a few things that are super helpful.", url: '/contribute/help-build-zechub' },
    { name: 'ZecHub DAO', desc: 'The ZecHub DAO currently consists of...', url: '/contribute/zechub-dao' },
    { name: 'ZecWeekly Newsletter', desc: 'ZecWeekly is a newsletter that goes out every Friday morning.', url: '/contribute/zecweekly-newsletter' },
    { name: 'Dashboard', desc: 'Check the charts for ZEC', url: '/dashboard' },
    { name: 'DAO', desc: 'Check the DAO members', url: '/dao' }
]
