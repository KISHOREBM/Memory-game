import React, { useEffect, useState } from 'react'
const Memorygame = () => {
  const [gridsize, setgrid] = useState(4);
  const [cards, setcards] =useState([]);
  const [moves,setmoves] =useState(0);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] =useState(false);
  const [limit,setlimit] = useState(0);
  const [won, setwon] = useState(true);
  const [lost, setlost] = useState(false)
  const handlechange=(e)=>{
    const size = e.target.value;
    if(size>=2 && size<=10)
      setgrid(size)
  }
  const initilizegame=()=>{
    const totalcards = gridsize*gridsize;
    const pairCount = Math.floor(totalcards/2);
    const numbers = [...Array(pairCount).keys()].map((n)=>n+1);
    const shuffeldCards=[...numbers, ...numbers].sort(()=>Math.random()-0.5).slice(0,totalcards).map((number,index)=>({id:index,number}));
    console.log(shuffeldCards)
    setcards(shuffeldCards);
    setFlipped([]);
    setSolved([]);
    setwon();
    setlost();
    setDisabled(false)
    setmoves(0)
    setlimit(0)
  }
  const checkMatch=(secondid)=>{
    const [firstid] = flipped;
    setlimit(limit+1);
    if(cards[firstid].number===cards[secondid].number)
    {
      setSolved([...solved,firstid,secondid])
      setFlipped([])
      setDisabled(false)
    }
    else{
      setTimeout(()=>{
        setFlipped([])
        setDisabled(false)
      },1000)
    }
  }
  const handleClick=(id)=>{
    if(disabled || won) return;
    
    if(flipped.length===0)
    {
      setFlipped([id]);
      return;
    }
    if(flipped.length===1)
    {
      setDisabled(true);
      if(id!=flipped[0])
      {
        setFlipped([...flipped,id]);
        checkMatch(id);
      }
      else{
        setFlipped([]);
        setDisabled(false);
      }
    }
  }
  useEffect(()=>{
    if(solved.length===cards.length)
      setwon(true)
  },[solved,cards])
  const isFlipped=(id)=>flipped.includes(id) || solved.includes(id);
  const isSolved=(id)=>solved.includes(id);
  useEffect(()=>{
    if(limit == moves && moves!=0)
    {  setlost(true)
      setDisabled(true)
    }
    console.log(limit, moves)
  },[limit])
  useEffect(()=>{
    initilizegame();
  },[gridsize]);
  return (
    <div className='w-full h-screen bg-[#510ca0] flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center  bg-gray-200 p-4 w-[600px] '>
      <h1 className='text-3xl font-bold mb-6'>Memory game</h1>
      <div className='mb-4 flex flex-wrap '>
      <div className='flex w-full justify-center items-center gap-4 '>
        <div><label htmlFor="" className='mr-2'>Grid Size:</label>
        <input type="number" id='gridSize' min={2} max={10} value={gridsize} onChange={handlechange}
        className='border-2 border-gray-300 rounded px-2 py-1 bg-transparent border-none'/>
        </div>
        <div>
        <label htmlFor="">Max Moves:</label>
        <input type="number"id='Maxmoves' min={0} max={10} value={moves} onChange={(e)=>{setmoves(e.target.value)}}
        className='border-2 border-gray-300 rounded px-2 py-1 bg-transparent border-none'  />
        </div> 
        </div>
        <div className='w-full flex justify-center items-center'>current moves = {limit}</div>
        
      </div>
      <div className={`grid gap-2 mb-4`} style={{gridTemplateColumns:`repeat(${gridsize},minmax(0,1fr))`, width:`min(100%, ${gridsize * 5.5}rem)`}} >
        {cards.map((card)=>{
          return(
            <div key={card.key} className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300  ${isFlipped(card.id)?isSolved(card.id)?"bg-green-500 ":"bg-blue-500 text-white":"bg-gray-300 text-gray-400"} `}  onClick={()=>handleClick(card.id)}>
              {isFlipped(card.id)?card.number:"?"}
            </div>
          )
        })}
      </div>
      {won && (<div className='mt-4 text-4xl font-bold text-green-600 animate-bounce'>You won!</div>)}
      {lost && (<div className='mt-4 text-4xl font-bold text-red-600 animate-bounce'>You lost!</div>)}
      <button className={`mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-green-400`} onClick={initilizegame}>
        {won || lost ?"play Again": "Reset"}
        
      </button>
    </div>
    
    </div>
  )
}

export default Memorygame
