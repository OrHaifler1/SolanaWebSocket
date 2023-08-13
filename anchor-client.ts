console.log(pg.wallet.publicKey.toString(), "saying hello:");

// 1. Fetch the latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash("finalized");

//const data = new anchor.BN(123); //Your data parameter value goes here

// 2. Call say_hello and send the transaction to the network

const tx = await pg.program.rpc.sayHello(new anchor.BN(123412321), {
  accounts: {},
  signers: [pg.wallet.payer],
});

// 3. Confirm the transaction and log the tx URL
await pg.connection.confirmTransaction(tx);

console.log(
  "Transaction Complete: ",
  `https://explorer.solana.com/tx/${tx}?cluster=custom`
);

console.log(tx);
