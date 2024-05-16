import './App.scss';
import QRCode from 'qrcode';
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode ] = useState('');
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(qrcode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyName2, setCompanyName2] = useState('');
  const [name2, setName2] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email2, setEmail2] = useState('');

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log(url);
      setQrcode(url);
      setImage(url);
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const item = {
      id: Math.floor(Math.random()*1000),
      companyname: e.target.companyname.value,
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      value: url,
      image: qrcode
    };
    setItems(oldList=> [...oldList, item]);
    console.log(items);
    setCompanyName('');
    setName('');
    setPhone('');
    setEmail('');
    setUrl('');
  }
  function showBusinessCard(id){
    const item = items.find(item => item.id == id);
    if (item){
      setImage(item.image);
      setCompanyName2(item.companyname);
      // console.log(companyName2);
      setName2(item.name);
      setPhone2(item.phone);
      setEmail2(item.email);
    }
  }


  return (
    <div className="App">
      <h1 className='qr__title'>QR Code Generator</h1>
      <form className='qr__form' onSubmit={handleSubmit}>

      <label className="qr__label" htmlFor="companyname">Company Name</label>
        <input 
          className='qr__input'
          type="text" 
          placeholder='Company Name'
          value={companyName}
          name="companyname"
          id="companynamename"
          onChange={e=> setCompanyName(e.target.value)}
          // required
        />

      <label className="qr__label" htmlFor="name">Name</label>
        <input 
          className='qr__input'
          type="text" 
          placeholder='Name'
          value={name}
          name="name"
          id="name"
          onChange={e=> setName(e.target.value)}
          // required
        />

        <label className="qr__label" htmlFor="phone">Phone Number</label>
        <input 
          className='qr__input'
          type="text" 
          placeholder='Phone Number'
          value={phone}
          name="phone"
          id="phone"
          onChange={e=> setPhone(e.target.value)}
          // required
        />

        <label className="qr__label" htmlFor="email">Email Address</label>
        <input 
          className='qr__input'
          type="email" 
          placeholder='Email'
          value={email}
          name="email"
          id="email"
          onChange={e=> setEmail(e.target.value)}
          // required
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
          required
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
              <li className="qr__li" key={item.id}>{item.companyname}</li>
              {/* <img src={item.image} alt="qr code" /> */}
              <button onClick={()=>showBusinessCard(item.id)}>Show Business Card</button>
            </section>
          )
        })}
      </ul>
    </div>
  );
}
export default App;