'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { STRAPI_KEY , STRAPI_PORT} from '../../env';

export default function Home() {
  const [players, setPlayers] = useState();
  const [cart, setCart] = useState(0);
  const [color, setColor] = useState('');
  const [secColor, setSecColor] = useState('');
  const  router  = useRouter();
const handleSvgClick = () => {
  router.push('/addelement');
};


  const fetchData = async () => {
    try {
      const header = {
        'Authorization': `Bearer ${STRAPI_KEY}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch(`${STRAPI_PORT}/api/people?populate=*`, { headers: header });
      const pla = await res.json();
      setPlayers(pla);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (players?.data) {
  //     players.data.forEach((item) => {
  //       if (item.attributes.Rank == "Zen") {
  //         setColor('zinc-300');
  //         setSecColor('yellow-500');
  //       } else if (item.attributes.Rank == "Veteran") {
  //         setColor('slate-700');
  //         setSecColor('indigo-500');
  //       }
  //     });
  //   }
  // }, [players]);
  

  const addElixir = async (item, qty) => {
    const updatedElixir = item.attributes.Elixir + 50;
    const updatedItem = { ...item, attributes: { ...item.attributes, Elixir: updatedElixir } };
    setCart(cart + qty);

    try {
      const header = {
        'Authorization': `Bearer ${STRAPI_KEY}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch(`${STRAPI_PORT}/api/people/${item.id}`, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify({ data: updatedItem })
      });

      const updatedPlayer = await res.json();
      console.log("Updated Player ", updatedPlayer);

      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.data.map((player) => {
          if (player.id === item.id) {
            return updatedPlayer;
          }
          return player;
        });
        return { ...prevPlayers, data: updatedPlayers };
      });
    } catch (err) {
      console.error(err);
    }
  };
  const colorVariant = {
    "blue":"from-blue-500/50",
    "red":"from-red-500/50",
    "white":"from-white/50",
    "yellow":"from-yellow-500/50",
    "green":"from-green-500/50"
  }
 
  return (
    <div className="min-h-[100vh]  bg-slate-900 flex space-evenly flex-wrap justify-center items-center">
      {players?.data && players.data.map((item) => (
        <div className={`card  overflow-hidden flex h-[90vh] w-[80vw]  z-20  md:w-[40vw] lg:w-[30vw] m-[10vw] md:m-[5vw] lg:m-[1.5vw]  rounded-lg hover:translate-y-[-10px] ease-linear transition`}>
          <div className={`rounded-lg ${colorVariant[item.attributes.color]} absolute design z-10 h-[90vh] w-[80vw] md:w-[40vw] lg:w-[30vw] bg-gradient-to-t via-slate-700  to-slate-700`}></div>
          <div className="user h-full z-20 flex justify-center items-center flex-col text-white w-full">
            <h1 className="font-bold text-6xl uppercase">{item.attributes.Username}</h1>
            <div className="elixir flex">
              <img className="w-[20px] h-[20px]" src="/lighting.png" alt="" />
              <h1 className="text-xl">{item.attributes.Elixir} Elixir</h1>
            </div>
            <div className="rank ">
              <h1 className="stroke text-transparent font-mono  text-[4rem] z-20 translate-x-[10vw] font-bold rotate-[-90deg]">{item.attributes.Rank}</h1>
            </div>
            <div className="defence flex justify-center items-center p-0 ">
              <h1>Defence</h1>
            <progress className='rounded-lg m-2 bg-slate-300' value={item.attributes.Defence} max="200"> 32% </progress>
            </div>
            <div className="defence flex justify-center items-center">
              <h1>Theory</h1>
            <progress className='rounded-lg m-2 bg-slate-300' value={item.attributes.Theory} max="200"> 32% </progress>
            </div>
            <div className="defence flex justify-center items-center">
              <h1>Forward</h1>
            <progress className='rounded-lg m-2 bg-slate-300' value={item.attributes.Forward} max="200"> 32% </progress>
            </div>
            <div className="defence flex justify-center items-center">
              <h1>Keeping</h1>
            <progress className='rounded-lg m-2 bg-slate-300' value={item.attributes.keeper} max="200"> 32% </progress>
            </div>
            {/* <button className="bg-indigo-500 p-2 rounded-lg mt-[20vh]" onClick={() => addElixir(item, 50)}>Add Elixir</button> */}
          </div>
        </div>
      ))}
      <div className={`card  overflow-hidden flex h-[90vh] w-[80vw]  z-20 bg-slate-700 justify-center items-center  md:w-[40vw] lg:w-[30vw] m-[10vw] md:m-[5vw] lg:m-[1.5vw]  rounded-lg hover:translate-y-[-10px] ease-linear transition`}>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSvgClick} className='text-white' width="100" height="100" viewBox="0 0 24 24">
  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
</svg>

    </div>
    </div>
  );
}
