import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function App() {
    const [cidade, setCidade] = useState('')
    const [days, setDays] = useState(1)

    return (
        <div className="w-full min-h-screen  py-4 px-5 mx-auto my-0 bg-gray-50">
            <div className='w-full flex flex-col gap-4 max-w-[400px] mx-auto my-0'>

                <h1 className="text-center font-normal text-4xl text-black">
                    Travel Flow
                </h1>
                <p className='text-center'>Gere um roteiro de viagem apenas informando a cidade e tempo de estadia!🌉</p>
                <div className="w-full max-w-[400px] mx-auto my-0 bg-gray-200 flex gap-2 flex-col justify-start items-start p-5 mt-8 ">
                    <label htmlFor="city" className="font-semibold">
                        Cidade Destino
                    </label>
                    <input type="text" name="city" value={cidade} placeholder="Ex: São Paulo, SP" className="placeholder-gray-300 border-2 border-gray-400 px-3 py-1" />
                    <label htmlFor="estadia" className="font-semibold" >
                        Tempo de estadia: {days > 1 ? `${days} dias` : `${days} dia`} 
                    </label>
                    <Slider
                        size="small"
                        value={days}
                        min={1}
                        max={10}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={(ev: Event, value) => setDays(value as number)}
                    />
                </div>
                <button className='w-full  border-none bg-pink-600 hover:bg-pink-500 transition-all text-white font-semibold text-md px-5 py-3'>
                    Gerar roteiro
                </button>

                <div className='w-full bg-gray-200 py-4 px-5 '>
                    <h3 className='text-center text-xl'>Roteiro da sua viagem 🏖️</h3>
                    <p className='bg-white border-none mt-6 w-full px-3 py-4'>
                        Aqui
                    </p>
                </div>
            </div>

        </div>
    )
}