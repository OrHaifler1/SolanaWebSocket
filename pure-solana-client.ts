async function main() {
  // Replace with the actual program ID
  const programId = new web3.PublicKey(
    "C6hvMeCf5xAzbSBepYrfC47vEhc1EVjwF5EjMCy4cE5i"
  );

  // Replace with the actual payer's private key and public key
  const payerPrivateKey = Uint8Array.from([
    200, 144, 66, 233, 123, 191, 165, 44, 171, 27, 143, 214, 113, 235, 124, 209,
    187, 181, 83, 142, 93, 246, 210, 46, 60, 169, 145, 178, 207, 39, 106, 115,
    134, 213, 39, 225, 104, 28, 41, 62, 173, 31, 236, 148, 145, 162, 233, 58,
    25, 156, 205, 128, 172, 72, 30, 253, 235, 228, 145, 128, 84, 194, 51, 174,
  ]); // 64 bytes private key
  const payerPublicKey = pg.wallet.publicKey;

  // Derive payer's account from private key
  const payerAccount = new web3.Account(payerPrivateKey);

  // Create a transaction
  const transaction = new web3.Transaction().add(
    new web3.TransactionInstruction({
      keys: [
        { pubkey: payerAccount.publicKey, isSigner: true, isWritable: true },
      ],
      programId,
      data: new Uint8Array([45, 1, 0, 0]), // Little-endian representation of integer 123
    })
  );

  // Sign and send the transaction
  const blockhash = await pg.connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash.blockhash;
  transaction.sign(payerAccount);

  const txHash = await web3.sendAndConfirmTransaction(
    pg.connection,
    transaction,
    [payerAccount]
  );

  console.log(`Transaction Hash: ${txHash}`);
}

main().catch((err) => {
  console.error(err);
});
