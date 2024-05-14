import './App.scss';
import QRCode from 'qrcode';
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [qrcode, setQrcode ] = useState('');

  const GenerateQRCode = (e) => {
    // e.preventdefault();
    QRCode.toDataURL(url, (err, url) => {
      // if(!url){
      //   alert('Please enter a valid url.')
      //   return;
      // }
      if (err) {
        console.error(err);
        return;
      }
      console.log(url);
      setQrcode(url);
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = {
      // options: document.querySelector('input[name="options"]:checked'),
      name: e.target.userName.value,
      phone: e.target.phoneNumber.value,
      email: e.target.userEmail.value,
      website: e.target.website.value
    };
    console.log(formData);
    setUrl('');
    setName('');
    setPhone('');
    setEmail('');
  }


  return (
    <div className="App">
      <h1 className='qr__title'>QR Code Generator</h1>
      <form className='qr__form' onSubmit={handleSubmit}>
        {/* <section className='qr__radiocontainer'>
          <div className='qr__radio2'>Is this for a business or personal?</div>
          <div className='qr__radiopar'><input type="radio" id="option1" name="options"/><label className='qr__radio' for="option1">Business</label></div>
          <div className='qr__radiopar'><input type="radio" id="option2" name="options"/><label className='qr__radio' for="option2">Personal</label></div>
        </section> */}
        <input
          className='qr__input' 
          type="text" 
          placeholder='Name'
          name='userName'
        />
        <input
          className='qr__input'
          type="text" 
          placeholder='Phone Number'
          name='phoneNumber'
        />
        <input 
          className='qr__input'
          type="email" 
          placeholder='email'
          name='userEmail'
        />
        <label className="qr__label" htmlFor="website">Website URL</label>
        <input 
          className='qr__input'
          type="text" 
          placeholder='Website'
          value={url}
          name="website"
          id="website"
          onChange={e=> setUrl(e.target.value)}
          // required
        />
        <button className='qr__button' onClick={GenerateQRCode}>Generate</button>
      </form>
      {qrcode && <>
        <img src={qrcode} alt="QR Code" />
      </>}
    </div>
  );
}
export default App;