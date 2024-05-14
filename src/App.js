import './App.scss';
import QRCode from 'qrcode';
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode ] = useState('');
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(qrcode);

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
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
      website: e.target.website.value
    };
    console.log(formData);
    const item = {
      id: Math.floor(Math.random()*1000),
      value: url,
      image: qrcode
    }
    setItems(oldList=> [...oldList, item]);
    console.log(items);
    setUrl('');
  }
  function showWebsite(id){
    const item = items.find(item => item.id == id);
    if (item){
      setImage(item.image)
    }
  }


  return (
    <div className="App">
      <h1 className='qr__title'>QR Code Generator</h1>
      <form className='qr__form' onSubmit={handleSubmit}>

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
        <img src={image} alt="QR Code" />
      </>}
      <ul>
        {items.map(item=>{
          return(
            <section className='qr__imagelist'>
              <li className="qr__li" key={item.id}>{item.value}</li>
              <img src={item.image} alt="qr code" />
              <button onClick={()=>showWebsite(item.id)}>Show Website</button>
            </section>
          )
        })}
      </ul>
    </div>
  );
}
export default App;