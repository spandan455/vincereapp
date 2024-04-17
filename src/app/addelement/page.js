"use client"
import React from 'react'
import { useState } from 'react'
import { STRAPI_KEY , STRAPI_PORT } from '../../../env'

export default function addelement () {
  const [PlayerName, setPlayerName] = useState("")
  const [Forward, setForward] = useState("")
  const [Defence, setDefence] = useState("")
  const [Keeper, setKeeper] = useState("")
  const [Rotation, setRotation] = useState("")
  const [Theory, setTheory] = useState("")
  const [Pin, setPin] = useState("")

  const handleChange = (event)=>{
    setPlayerName(event.target.value)
  }
  const handleChangeF = (event)=>{
    setForward(event.target.value)
  }
  const handleChangeD = (event)=>{
    setDefence(event.target.value)
  }
  const handleChangeK = (event)=>{
    setKeeper(event.target.value)
  }
  const handleChangeT = (event)=>{
    setTheory(event.target.value)
  }
  const handleChangeR = (event)=>{
    setRotation(event.target.value)
  }
  const handleChangePin = (event)=>{
    setPin(event.target.value)
  }
  

  const findTotal =(n1 , n2 , n3 , n4 , n5)=> {
    
    return parseInt(n1) + parseInt(n2) + parseInt(n3) + parseInt(n4) + parseInt(n5);
  }

  const findRank=(points)=> {
    if (points >= 1100) {
      return 'Zen';
    } else if (points >= 900 && points < 1100) {
      return 'Veteran';
    } else if (points >= 700 && points < 900) {
      return 'Dominus';
    } else if (points >= 500 && points < 700) {
      return 'Lupin';
    } else {
      return 'Challangers';
    }
  }
  function getColor(rank) {
    if (rank === 'Zen') {
      return 'yellow';
    } else if (rank === 'Veteran') {
      return 'red';
    } else if (rank === 'Dominus') {
      return 'blue';
    } else if (rank === 'Lupins') {
      return 'green';
    } else {
      return 'white';
    }
  }

  const submission = ()=>{

      const points = findTotal(Forward , Defence , Rotation , Keeper , Theory)
      const rank = findRank(points)
      const color = getColor(rank)
      const link = `${STRAPI_PORT}/api/people`
      const pass = `Bearer ${STRAPI_KEY}`
      console.log(points , rank , color , link , pass)
      fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': pass
        },
        body: JSON.stringify({
          "data" :{
            
            
            "Username" : PlayerName,
            "Elixir" : points,
            "Rank" : rank,
            "color" : color,
            "Forward" : Forward,
            "Defence" : Defence,
            "Rotation" : Rotation,
            "keeper" : Keeper,
            "Theory" : Theory
          }
        }),
      })
    
  }
  
    return (
      <div className='w-[100vw] h-[100vh] bg-slate-900 flex justify-center items-center'>
        <div className="form w-[80vw]  h-[80vh] flex flex-col ">

        <input type="Name" placeholder='Name'  onChange={handleChange} value={PlayerName} className='bg-slate-800 p-2 my-[2.5vh] rounded-lg text-white' />
        <input type="Number" placeholder='Forward' max="200" onChange={handleChangeF} value={Forward} className='bg-slate-800 p-2 my-[2.5vh]  rounded-lg text-white' />
        <input type="Number" placeholder='Defence' max="200" onChange={handleChangeD} value={Defence} className='bg-slate-800 p-2 rounded-lg my-[2.5vh]  text-white' />
        <input type="Number" placeholder='Keeper' max="200" onChange={handleChangeK} value={Keeper} className='bg-slate-800 p-2 rounded-lg my-[2.5vh] text-white' />
        <input type="Number" placeholder='Theory' max="100" onChange={handleChangeT} value={Theory} className='bg-slate-800 p-2 rounded-lg my-[2.5vh] text-white' />
        <input type="Number" placeholder='Rotation' max="300" onChange={handleChangeR} value={Rotation} className='bg-slate-800 p-2 rounded-lg my-[2.5vh] text-white' />
        <button className='p-2 bg-indigo-500 text-white my-[2.5vh] rounded-lg' onClick={submission}>Add Player</button>
        </div>
      </div>
    )
}
