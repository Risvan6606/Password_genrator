// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [length,setLength]=useState(6)
  const [password,setPassword]=useState('')
  const [error,setError]=useState()
  const [Options,setOptions]=useState({
    includeUppercase:true,
    includeLowercase:true,
    includeNumber:true,
    includeSpecialCharator:true
  })
function generatePassword(){
  const {
    includeUppercase,
    includeLowercase,
    includeNumber,
    includeSpecialCharator
  }=Options
  if(!includeUppercase && !includeLowercase && !includeNumber && !includeSpecialCharator){
    setError('please select atleast one')
    return
  }
  let charSet=''
  if(includeUppercase) charSet +='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if(includeLowercase) charSet +='abcdefghijklmnopqrstuvwxyz'
  if(includeNumber) charSet +='1234567890'
  if(includeSpecialCharator) charSet += '!@#$%^&*()_+[]{}|;:,.<>?'

  let passwords=''
console.log(length)
  for(let i=0;i<length;i++){
   const randomIndex=Math.floor(Math.random()*charSet.length)
  
   passwords+=charSet[randomIndex]
  }
  setPassword(passwords)
  console.log(passwords)
}

  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <div className="img_text_container">
        <img src='/security-lock.png' className="App-logo" alt="logo" />
          <p style={{ fontFamily: "cursive",color:"white", fontWeight:'bold' }}>Password Generator</p>
        </div>

        <div>
        <div className="generator-container">
            <fieldset style={{ padding: "10px" }}>
              <legend>Type the length of the password</legend>
              <div className="form__group">
                <input
                  type="number"
                  className="inputField inputs"
                  required
                  defaultValue={length}
                  onChange={(e)=>setLength(e.target.value) }
                />
              </div>
            </fieldset>
            <fieldset>
              <legend> Options </legend>
              <div className="form__group">
                <input
                  type="checkbox"
                  name="Include Uppercase"
                  checked={Options.includeUppercase}
                  onChange={(e)=>{
                    setOptions((preOptions)=>({
                      ...preOptions,
                      includeUppercase:!Options.includeUppercase
                    }))
                  }}  
                />
                <label> Include Uppercase Letters</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={Options.includeLowercase}
                  onChange={(e)=>{
                    setOptions((preOptions)=>({
                      ...preOptions,
                      includeLowercase:!Options.includeLowercase
                    }))
                  }} 
                />
                <label> Include Lowercase Letters</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={Options.includeNumber}
                  onChange={(e)=>{
                    setOptions((preOptions)=>({
                      ...preOptions,
                      includeNumber:!Options.includeNumber
                    }))
                  }} 
                />
                <label> Include Numbers</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={Options.includeSpecialCharator}
                  onChange={(e)=>{
                    setOptions((preOptions)=>({
                      ...preOptions,
                      includeSpecialCharator:!Options.includeSpecialCharator
                    }))
                  }} 
                />
                <label> Include Special Characters</label>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </fieldset>
            <button
            className='btn_generate'
            onClick={generatePassword}
            >
              Generate
            </button>

           
              <fieldset>
                <legend>Your Generated Password</legend>
                <div className="form__group display_box">
                  <input
                    type="text"
                    readOnly
                    className="inputField"
                    value={password}
                  />
                  <button
                    className='btn_copy'
                    onClick={()=>{
                      navigator.clipboard
                      .writeText(password)
                      .then(()=>toast.success('copied'))
                      .catch((err)=>toast.error('somthing went wrong try again'))
                    }}
                  >
                    Copy
                  </button>
                </div>
              </fieldset>
           
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
