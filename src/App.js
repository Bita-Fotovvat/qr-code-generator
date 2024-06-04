import './App.scss';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode ] = useState('');
  const [items, setItems] = useState([]);
  // const [image, setImage] = useState(qrcode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessCard, setBusinessCard] = useState([]);

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrcode(url);
      console.log(qrcode);
      // setImage(url);
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
    setBusinessCard(item);
    setItems(oldList=> [...oldList, item]);
    console.log(items);

    setCompanyName('');
    setName('');
    setPhone('');
    setEmail('');
    setUrl('');
    // setImage('');
  }
  console.log(items);

  useEffect(()=>{
    const itemsFromLocalStorage = localStorage.getItem("items");
    if(itemsFromLocalStorage){
      const parsedItemsFromLocalStorage = JSON.parse(itemsFromLocalStorage);
      setItems(parsedItemsFromLocalStorage);
      console.log(items);
    }
  }, []);
 

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function showBusinessCard(id){
    const item = items.find(item => item.id === id);
    if (item){
      setBusinessCard(item);
      setQrcode(item.image);
      console.log(businessCard);
      console.log(businessCard.image);
    }
    console.log(items);
  }

  function deleteItem(id){
    const filteredList = items.filter(item=> item.id !==id);
    if (filteredList){
      setItems(filteredList);
    }
  }

  return (
    <div className="App">
      <h1 className='qr__title'>Business Card Generator</h1>
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
      {qrcode &&
      <section className='qr__businesscard'>
        <ul className='qr__uli'>
          <li className='qr__li'>Company Name: {businessCard.companyname}</li>
          <li className='qr__li'>Name: {businessCard.name}</li>
          <li className='qr__li'>Phone Number: {businessCard.phone}</li>
          <li className='qr__li'>Email Address: {businessCard.email}</li>
        </ul>
        <img src={qrcode} alt="QR Code" />
      </section>
      }

      <ul className='qr__imagelistparent'>
        {items.map(item=>{
          return(

            <section className='qr__imagelist'>
              <li className='qr__li'>{item.companyname}</li>
              {/* <img src={item.image} alt="qr code" /> */}
              <button className='qr__businesscardbutton' onClick={()=>showBusinessCard(item.id)}>Show Business Card</button>
              <button className='qr__businesscardbutton2' onClick={()=>deleteItem(item.id)}>Delete</button>
            </section>
          )
        })}
      </ul>
    </div>
  );
}
export default App;