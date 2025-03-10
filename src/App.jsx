import { useState , useCallback , useEffect , useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  const passwordref = useRef(null)

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    }

    if(charAllowed){
      str+="!@#$%^&*()_-+=[]|<>~`"
    }

    for(let i = 1 ; i<=length ; i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)


  } , [length , numberAllowed , charAllowed , setPassword])

  const copypasswordtoclipboard = useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{passwordgenerator()}, [length , numberAllowed , charAllowed , passwordgenerator])
  
  

  


  return (
    <>
   <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 my-16 text-orange-500 bg-gray-700'><h1 className='text-white text-center  '>Password Generator</h1>
    <div className='className = "flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none  w-full py-2 px-3 mb-4 my-4 rounded-lg'
      placeholder='password'
      readOnly 
      ref={passwordref}
      
      
      />
      <button onClick = {copypasswordtoclipboard}className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      
    </div>
    <div className='text-sm flex gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max = {100}
        value = {length}
        className='cursor-pointer'
        onChange={(e)=>{
          setLength(e.target.value)
        }} 
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        id = "numberInput"
        onChange={()=>{
          setNumberAllowed((prev)=> !prev)
        }} />
        <label htmlFor="numberInput">Numbers</label>

      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id = "characterInput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }} />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
      
    
   </div>
    
   
      
    </>
  )
}

export default App
