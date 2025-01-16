import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from '@metaplex-foundation/umi';
import {
  createNft,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';

import wallet from '../wba-wallet.json';
import base58 from 'bs58';

const RPC_ENDPOINT = 'https://api.devnet.solana.com';
const METADATA_URI =
  'https://devnet.irys.xyz/4NvLkUB7qVqa8yidgvW9j3x4hbVyzdNdmLhoFaRJJLLS';

const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = createNft(umi, {
    mint,
    sellerFeeBasisPoints: percentAmount(50),
    name: 'Farhan Turbin3 NFT',
    uri: METADATA_URI,
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
  console.log('Mint Address: ', mint.publicKey);
  // Txn address - 2dJdaXXptGgzNCarDVgGb4AtZj6sWJmaHyzdxJr8vioQzF2GVSCtnYqBCyCZzCj5wnhRyDzJYF3dBxgVGHSyk3iR
  // Mint address - 3XYahshVLnxz642sbHrpuih6mzSB6rJ7CmWng4bRigi3
})();
