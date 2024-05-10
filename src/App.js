import './App.scss';

function App() {
  return (
    <div className="App">
      <h1 className='qr__title'>QR Code Generator</h1>
      <form className='qr__form'>
        <input
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
        />
        <input 
        className='qr__input'
        type="text" 
        placeholder='Website'
        />
        <button className='qr__button'>Generate</button>
      </form>
    </div>
  );
}

export default App;
