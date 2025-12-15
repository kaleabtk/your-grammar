'use client'
import "./globals.css";
import { useState } from 'react'
import ReactMarkdown from 'react-markdown';

function App() {

  const [inputValue, setInputValue] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState('')


  const onChangeHandler = (event) => {
    const value = event.target.value
    setInputValue(value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading('Loading...')

    await fetch('/api/openai', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input_text: inputValue })
    }).then((res) => {
      if (!res.ok) throw new Error("Request failed!");
      return res.json();
    })
      .then((json) => setResponse(json.response))
      .catch(console.error)
      .finally(() => setLoading(''));

  }

  return (
    <div className='flex flex-col items-center gap-3 mt-3 w-[96%] md:w-[75%] lg:w-[50%] m-auto'>
      <p className='mt-3.5'>Enter or paste your sentence to check its grammar and spelling.</p>

      <div className='w-full relative'>
        <form onSubmit={submitHandler} className='flex justify-center items-center flex-col gap-3'>

          <textarea onChange={onChangeHandler} value={inputValue} name="input_text" id="input_text"
            className='border border-[#b09e99aa] focus:outline-none w-full h-25 rounded-md px-1 py-0.5 bg-[#302e2e]'></textarea>
          <button className='cursor-pointer absolute right-2 bottom-11' onClick={() => setInputValue('')} disabled={inputValue === ''}>Clear</button>

          <button className='bg-[#3c3636] font-bold px-1.5 py-1 rounded-md cursor-pointer hover:bg-[#463b3b]' type="submit">Check</button>
        </form>
      </div>

      <div className='border border-[#b09e99aa] w-full min-h-4 rounded-md p-2.5'>{loading}
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div >
  )
}

export default App
