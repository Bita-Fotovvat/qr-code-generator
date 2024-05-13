import './App.scss';
import QRCode from 'qrcode';
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode ] = useState('');

  const GenerateQRCode = (e) => {
    e.preventdefault();
    QRCode.toDataURL(url, (err, url) => {
      if(!url){
        alert('Please enter a valid url.')
        return;
      }
      if (err) {
        console.error(err);
        return;
      }
      console.log(url);
      setQrcode(url);
    })
  }


  return (
    <div className="App">
      <h1 className='qr__title'>QR Code Generator</h1>
      <form className='qr__form'>
        {/* <input
          className='qr__input' 
          type="text" 
          placeholder='Name'
        />
        <input 
          className='qr__input'
          type="text" 
          placeholder='Phone Number'
        />
        <input 
          className='qr__input'
          type="text" 
          placeholder='email'
        /> */}
        <input 
          className='qr__input'
          type="text" 
          placeholder='Website'
          value={url}
          onChange={e=> setUrl(e.target.value)}
        />
        <button className='qr__button' onClick={GenerateQRCode}>Generate</button>
      </form>
      <img src={qrcode} alt="QR Code" />
    </div>
  );
}
export default App;