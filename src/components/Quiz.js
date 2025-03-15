import React from 'react'
import { Badge } from './ui/badge'
import { useState, useEffect } from 'react'
import data from '@/data/data.json';
import axios from 'axios';
import { Button } from "@/components/ui/button"



const Quiz = () => {

    const [randomDestination, setRandomDestination] = useState({});
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState('');
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [options, setOptions] = useState([]);
    const [showNextClue, setShowNextClue] = useState(false);
    const [correctOptionFormatted, setCorrectOptionFormatted] = useState('bg-sky-50');

    useEffect(() => {
        getRandomDestination();
    }
        , []);

    const getRandomDestination = async () => {
        try {
            const response = await axios.get('/api/random-dest');
            setRandomDestination(response.data);
            console.log(response.data.options);
            setOptions([response.data.options].sort(() => Math.random() - 0.5));
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const checkAnswer = (option) => {
        setSelected(option);
        setDisabled(true);
        if (option === randomDestination.correctDestination.city) {
            setCorrect(true);
            setCorrectOptionFormatted("bg-green-200");
            setScore(score + 1);

        } else{
            setCorrectOptionFormatted("bg-red-200");
            setCorrect(false);
        }
    }

    const nextQuestion = () => {
        setDisabled(false);
        setCorrect(false);
        setSelected('');
        getRandomDestination();
    }

    if (loading) {
        return <div>Loading...</div>;
    }





    return (
        <section className="container px-6 py-6 flex flex-col justify-center pt-16">
            <Badge className={"bg-sky-200 text-sky-500 mb-5"}>Answer and Score</Badge>
            

            <div className='question bg-sky-50 p-6 min-h-[120px] rounded-lg flex items-center justify-center mb-6 transition-all duration-500 transform border-2 relative'>
                <span className="text-center">
                    {showNextClue
                        ? <div>
                            <div><span className='font-bold text-sky-400'>Clue 1: </span>{randomDestination.correctDestination.clues[0] }</div>
                            <div><span className='font-bold text-sky-400'>Clue 2: </span>{randomDestination.correctDestination.clues[1]}</div>
                        </div>
                        : <div><span className='font-bold text-sky-400'>Clue 1: </span>{randomDestination.correctDestination.clues[0] }</div>}
                </span>

                {!showNextClue && (
                    <button
                        onClick={() => setShowNextClue(true)}
                        className='absolute bottom-2 right-2  text-gray-400 px-3 py-1 text-sm rounded-xs hover:text-sky-500 transition duration-300'
                    >
                        Next Clue
                    </button>
                )}
            </div>


            <div className='options grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                {options[0].map((option, index) => (
                    <div key={index}>
                        <div className={`option
                        ${(randomDestination.correctDestination.city!==selected)&&selected===option&&correctOptionFormatted} 
                        ${(randomDestination.correctDestination.city===selected)&&randomDestination.correctDestination.city===option&&correctOptionFormatted} 
                        ${selected===''&&"bg-sky-50"} 
                        py-3 px-4 rounded-lg text-left transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm border-2 `} onClick={() => checkAnswer(option)}>
                            {option}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Quiz;