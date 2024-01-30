import { CircularProgress, Slider } from '@mui/material';
import { useState } from 'react';
const gptKey = import.meta.env.VITE_GPT_KEY; //sua api do gpt

export default function App() {
    const [cidade, setCidade] = useState('')
    const [days, setDays] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [roteiro, setRoteiro] = useState('')

    async function handleGenerateTravelScript() {
        if (cidade === "") {
            return
        }

        const default_prompt = `Crie um roteiro para uma viagem de exatos ${days} dias na cidade de ${cidade}, busque por lugares turisticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`

        setIsLoading(true)

        fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${gptKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: default_prompt
                    }
                ],
                temperature: 0.50,
                max_tokens: 700,
                top_p: 1
            })
        })
            .then(response => response.json())
            .then(data => {
                setRoteiro(data.choices[0].message.content)
            }).finally(() => {
                setIsLoading(false)
            })
    }
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
                    <input
                        type="text"
                        name="city"
                        value={cidade}
                        placeholder="Ex: São Paulo, SP"
                        className="placeholder-gray-300 border-2 border-gray-400 px-3 py-1"
                        onChange={ev => setCidade(ev.target.value)}
                    />
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
                <button onClick={handleGenerateTravelScript} className='w-full  border-none bg-pink-600 hover:bg-pink-500 transition-all text-white font-semibold text-md px-5 py-3'>
                    Gerar roteiro
                </button>

                <div className='w-full bg-gray-200 py-4 px-5 '>
                    {isLoading && (
                        <div className='flex flex-col gap-6 justify-center items-center p-4'>
                            <h3 className='text-center text-xl'>Carregando seu roteiro 🌎</h3>
                            <CircularProgress />

                        </div>
                    )}
                    {!isLoading && (
                        <>
                            <h3 className='text-center text-xl'>Roteiro da sua viagem 🏖️</h3>
                            <p className='bg-white mt-6 w-full px-3 py-4 leading-6'>
                                {roteiro}
                            </p>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}