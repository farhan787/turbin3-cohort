import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';
import wallet from '../wba-wallet.json';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = 'confirmed';
const connection = new Connection('https://api.devnet.solana.com', commitment);

// Mint address
const mint = new PublicKey('DqqNyN8RbWKvGhm421ZqUcCMYzHwsptrMnoyqxBcPxdY');

// Recipient address
const to = new PublicKey('nbJUqLyPHSSp2uN36FVwC56Yb4HpSUadCpBKM13f88L');

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created
    const result = await transfer(
      connection,
      keypair,
      fromAta.address,
      toAta.address,
      keypair,
      2e6
    );
    console.log('Transfer result:', result);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
