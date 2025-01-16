import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { readFile } from 'fs/promises';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    //2. Convert image to generic file.
    //3. Upload image

    const image = await readFile('/Users/muhammadfarhan/Downloads/generug.png');
    const genericFile = createGenericFile(image, 'generug', {
      contentType: 'image/png',
      displayName: 'FTC Rug',
    });

    const [myUri] = await umi.uploader.upload([genericFile]);
    console.log('Your image URI: ', myUri);
    // new uri has domain - devnet.irys.xyz instead of arweave.net
    // My rug URI - https://devnet.irys.xyz/AY8aFtx46PCKjgCggG445nku2sUrNrYTEfDy6ATJhtYV
  } catch (error) {
    console.log('Oops.. Something went wrong', error);
  }
})();
