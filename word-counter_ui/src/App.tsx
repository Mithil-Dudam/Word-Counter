import { useState } from 'react'
import './App.css'
import api from './api'

function App() {
  
  const [text,setText] = useState<string>("")
  const [display,setDisplay] = useState<number>(0)
  const [error,setError] = useState<string|null>(null)
  const [words,setWords] = useState<number>(0)
  const [chars,setChars] = useState<number>(0)
  const [charsWithSpace,setCharsWithSpace] = useState<number>(0)
  const [frequent,setFrequent] = useState<string>("")
  const [occuring,setOccuring] = useState<number>(0)
  const [longestWord,setLongestWord] = useState<string>("")
  const [unique,setUnique] = useState<number>(0)

  const Result = async () => {
    setError(null)
    if(text === ""){
      setError("Cant sumbit empty text")
      return
    }
    setDisplay(1)
    try{
      const response = await api.post("/result",{text})
      if(response.status===200){
        setWords(response.data.words)
        setChars(response.data.chars)
        setCharsWithSpace(response.data.chars_with_space)
        setFrequent(response.data.frequent_word)
        setOccuring(response.data.occuring)
        setLongestWord(response.data.longest_word)
        setUnique(response.data.unique_words)
        setText("")
      }
    }catch(error:any){
      console.error(error)
      setError("Error: Couldnt get result")
    }
  }

  return (
    <div className='bg-black text-white min-w-screen min-h-screen'>
      <div>
        <h1 className='border-white border-b-2 text-center pt-10 text-6xl'>Word Counter</h1>
      </div>
      {display === 0 && (
        <div>
          <div className='pl-5'>
            <textarea cols={180} rows={15} className={`border-white border mt-10 py-1 px-5 ${error ? "placeholder-red-500":""}`} placeholder={error ? error:"Enter your text here"} value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </div>
          <div className='mt-5 flex justify-center'>
            <button className='border border-white px-2 py-1 cursor-pointer hover:bg-white hover:text-black text-lg font-semibold' onClick={Result}>Calculate!</button>
          </div>
        </div>
        )}
      {display === 1 && (
        <div>
          <div className='flex justify-center mt-20 font-semibold text-xl border mx-[15%] border-2 py-5 rounded'>
            <div className='text-left'>
              <p className='py-2'>Number of words: {words}</p>
              <p className='py-2'>Number of chars: {chars}</p>
              <p className='py-2'>Number of chars with space: {charsWithSpace}</p>
              <p className='py-2'>Most frequent word: {frequent}, occuring {occuring} times</p>
              <p className='py-2'>Longest word: {longestWord}</p>
              <p className='py-2'>Number of unique words: {unique}</p>
            </div>
          </div>
          <div className='mt-5 flex justify-center'>
            <button className='border border-white px-2 py-1 cursor-pointer hover:bg-white hover:text-black text-lg font-semibold' onClick={()=>setDisplay(0)}>Another Text!</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
