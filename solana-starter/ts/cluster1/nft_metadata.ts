import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      'https://devnet.irys.xyz/AY8aFtx46PCKjgCggG445nku2sUrNrYTEfDy6ATJhtYV';
    const metadata = {
      name: 'Farhan Turbin3 NFT',
      symbol: 'FTC NFT',
      description:
        'Farhan Turbin3 NFT is a very in-demand NFT among all the available NFTs in Web3 domains.',
      image,
      attributes: [{ trait_type: '?', value: '?' }],
      properties: {
        files: [
          {
            type: 'image/png',
            uri: image,
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log('Your metadata URI: ', myUri);
    // new uri has domain - devnet.irys.xyz instead of arweave.net
    // My metadata URI - https://devnet.irys.xyz/4NvLkUB7qVqa8yidgvW9j3x4hbVyzdNdmLhoFaRJJLLS
  } catch (error) {
    console.log('Oops.. Something went wrong', error);
  }
})();
