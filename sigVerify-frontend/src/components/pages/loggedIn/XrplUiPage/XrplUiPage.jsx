import { useContext, useState } from 'react';
import styles from './XrplUiPage.module.css';
import { AccountContext } from '../../../../App';
import { runSign } from '../../../../utils/script.js';

 function XrplUiPage  () {
    const [accountObject, setAccountObject] = useContext(AccountContext);
    const [signed, setSigned] = useState(false); // This state tracks whether the document has been signed.

    const handleSign = () => {
        // Add any logic needed for signing here
        setSigned(true); // Update the signed state to true
    };

/*     if (signed) {
        let res = runSign(); // This function should be implemented to run the signing process
        console.log(res);
        return (
            <div className={styles.xrplUi}>
                <div className={styles.xrplUiInnerDiv} style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>Success</h1>
                    <p>Your document has been successfully signed!</p>
                    <p>Success</p>

                </div>
            </div>
        );
    } */

    return (
        <div className={styles.xrplUi}>
            <div className={styles.xrplUiInnerDiv}>
                <h1 className="pageTitle">Sign Requests :</h1>
                <p>Your received requests of documents to sign :</p>
                <div style={{ padding: '20px', background: '#f4f4f4', width: '800px', margin: 'auto' }}>
                    <div style={{ background: 'white', border: '1px solid #ddd', marginBottom: '10px', padding: '15px', width: '100%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Name:</strong> Emre Dupont ☑️</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Email:</strong> emre.dupont@dupont.com</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Company:</strong> Dupont Ltd ☑️</div>
                        <div style={{ marginBottom: '8px' }}><strong>Status:</strong> Pending...</div>
                        <button onClick={handleSign} style={{ padding: '30px', marginBottom: '8px' }}>SIGN ✍️</button>
                        <button href="/deny" style={{ padding: '30px', marginBottom: '8px' }}>DENY ❌</button>
                    </div>
                    <div style={{ background: 'white', border: '1px solid #ddd', marginBottom: '10px', padding: '15px', width: '100%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Name:</strong> Sacha Dupont</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Email:</strong> sacha.dupont@dupontt.com</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Company:</strong> Dupont Ltd</div>
                        <div style={{ marginBottom: '8px' }}><strong>Status:</strong> Signature Denied ❌</div>

                    </div>
                    <div style={{ background: 'white', border: '1px solid #ddd', marginBottom: '10px', padding: '15px', width: '100%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Name:</strong> Wilfried Dupont ☑️</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Email:</strong> wilfried.dupont@dupont.com</div>
                        <div style={{ marginBottom: '8px' }}><strong>Sender Company:</strong> Dupont Ltd ☑️</div>
                        <div style={{ marginBottom: '8px' }}><strong>Status:</strong> Signed ✅</div>

                    </div>
                </div>


                {/* <div>
                    <RSAKeyPairGenerator onKeyPairGenerated={setKeys} />
                    {keys.publicKey && <DocumentEncryptor publicKey={keys.publicKey} />}
                </div> */}
                {/* <div className={styles.tiles}>
                    <Tile title="My Wallet" icon="🪪" link="/xrpl-ui" finePrint="" />
                    <Tile title="NFTs" icon="⚖️" link="/xrpl-ui" finePrint="" />
                    <Tile title="Smart Contracts" icon="📝" link="/xrpl-ui" finePrint="" />
                    <Tile title="Conditionals" icon="💡" link="/xrpl-ui" finePrint="" />
                </div> */}
            </div>
        </div>
    );

    
}

export default XrplUiPage;
