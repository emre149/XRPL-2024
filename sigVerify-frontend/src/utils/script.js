import { Client, Wallet, xrpToDrops } from "xrpl";
import chalk from 'chalk';
import pkg from 'elliptic';
const { ec } = pkg;

const client = new Client("wss://s.devnet.rippletest.net:51233/");
const ecInstance = new ec("secp256k1");

// Function to pin DIDDocument to IPFS using Pinata
async function pinFileToIPFS(didDocument) {
  const pinataApiKey = "a50075fcaa06cde562a3";
  const pinataSecretApiKey =
    "5fd4f66ada94e3b713212b57e487cb702ecff447cbe62c1ef5a58b2d2cabb58a";
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const response = await axios.post(url, didDocument, {
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  return response.data;
}

// Function to sign DID
async function signDID(did, privateKey) {
  const vc = {
    context: "https://www.w3.org/2018/credentials/v1",
    type: ["VerifiableCredential"],
    issuer: did,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: did,
      type: "DIDIdentity",
    },
  };

  try {
    const vcString = JSON.stringify(vc);
    const signature = signData(vcString, privateKey);
    vc["proof"] = {
      type: "EcdsaSecp256k1RecoveryMethod2020",
      created: new Date().toISOString(),
      proofPurpose: "assertionMethod",
      verificationMethod: did + "#keys-1",
      signature: signature,
    };
    return vc;
  } catch (error) {
    console.error("Error during DID VC creation and signing:", error);
    return null;
  }
}

// Function to create and sign DID
async function createAndSignDID(wallet) {
  const publicKeyForAssertion = wallet.publicKey;
  const did = `did:xrpl:${wallet.address}`;
  const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: did,
    controller: did,
    verificationMethod: [
      {
        id: `${did}#keys-1`,
        type: "EcdsaSecp256k1RecoveryMethod2020",
        controller: did,
        publicKeyHex: publicKeyForAssertion,
      },
    ],
  };

  console.log(chalk.yellow("📄 Detailed View of the DID Document:"));
  console.log(chalk.yellow(JSON.stringify(didDocument, null, 2)));

  // Sign the DID with the issuer's private key
  const signedVC = await signDID(did, wallet.privateKey);
  console.log(chalk.green("🌟 Signed DID Verifiable Credential:"));
  console.log(chalk.blue(JSON.stringify(signedVC, null, 2)));

  return did;
}

// Function to sign data
function signData(data, privateKey) {
  const key = ecInstance.keyFromPrivate(privateKey, "hex");
  const signature = key.sign(data);
  const derSign = signature.toDER("hex");
  return derSign;
}







// Sets a DID document on the XRP Ledger
async function setDID(wallet, didIpfsHash) {
/*     const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect(); */
  
    try {
        const prepared = await client.autofill({
            TransactionType: "DIDSet",
            Account: wallet.address,
            DIDDocument: didIpfsHash,
        });

        let signedTransaction = wallet.sign(prepared);

        const result = await client.submitAndWait(signedTransaction.tx_blob);
        console.log(
            chalk.blue(
                `Transaction result: ${JSON.stringify(result, null, 2)}`,
            ),
        );
        return result;
    } catch (error) {
        console.error(chalk.red(`Error setting DID: ${error}`));
        return null;
    } finally {
        await client.disconnect();
    }
}
const main = async () => {
  console.log("Let's get started...");
  await client.connect();

  console.log("Let's fund 2 accounts...");
  const { wallet: wallet1, balance: balance1 } = await client.fundWallet();
  const { wallet: wallet2, balance: balance2 } = await client.fundWallet();

  console.log("wallet1", wallet1);
  console.log({
    balance1,
    address1: wallet1.address,
    balance2,
    address2: wallet2.address,
  });
  let userDIDIpfsHash =
    "dffafde488960b37a54f648889e2aa4d493a609f4a078cc96780a53da3811793";
  // Create and sign DID for wallet1
  const did = await createAndSignDID(wallet1);
  console.log(chalk.green("🌟 Summary of Operations Performed for wallet1:"));
  console.log(chalk.blue(`🔹 Unique User DID Generated: ${did}`));

  await setDID(wallet1, userDIDIpfsHash);
  return wallet1.classicAddress; 
}

main().catch((error) =>
  console.error(chalk.redBright(`Critical error encountered: ${error}`)),
);


export async function runDoc() {
    console.log('Script is running...');

    let res = await main();
    console.log('datafrom runDoc', res);
    res = 'https://devnet.xrpl.org/accounts/' + res;
    return res; 
}

export async function runSign() {
    console.log('Script is running...');

    let res = await main();
    console.log('datafrom runDoc', res);
    res = 'https://devnet.xrpl.org/accounts/' + res;
    return res; 
}
