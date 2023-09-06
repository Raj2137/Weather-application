import React from 'react'

function Topmenu({setQuery}) {

    const cities= [
        {
            id: 1,
            title: "oklahoma"
        },
        {
            id: 2,
            title: "London"
        },
        {
            id: 3,
            title: "Paris"
        },
        {
            id: 4,
            title: "Sydney"
        },
        {
            id: 5,
            title: "Delhi"
        },
    ]
  return (
    <div className="flex items-center justify-around my-6">
        {
            cities.map((city)=> (
                <button key={city.id} className='text-lg text-white font-medium' onClick={()=> { setQuery({q: city.title})
                console.log(setQuery)}}>
            
                    {city.title}</button>
            )
            )
        }
    </div>
  )
}

export default Topmenu