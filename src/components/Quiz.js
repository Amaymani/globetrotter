import React from 'react'
import { Badge } from './ui/badge'
import { useState, useEffect } from 'react'
import data from '@/data/data.json';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti";
import Fact from './Fact';
import ScoreCard from './ScoreCard';
import { useRef } from 'react';
import domtoimage from "dom-to-image";
import { useSession } from "next-auth/react";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const Quiz = () => {

    const cardRef = useRef(null);

    const [imageUrl, setImageUrl] = useState(null);
    const {data:session, status} = useSession();

    const [randomDestination, setRandomDestination] = useState({});
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(null);
    const [options, setOptions] = useState([]);
    const [showNextClue, setShowNextClue] = useState(false);
    const [correctOptionFormatted, setCorrectOptionFormatted] = useState('bg-sky-50');

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [highScore, setHighScore] = useState(0);

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

        if (option === randomDestination.correctDestination.city) {
            setCorrect(true);
            setCorrectOptionFormatted("bg-green-200");
            setScore(score + 10);
            setCorrectAnswers(correctAnswers + 1);
            setTotalAnswers(totalAnswers + 1);
            const end = Date.now() + 1 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

            const frame = () => {
                if (Date.now() > end) return;

                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                });

                requestAnimationFrame(frame);
            };

            frame();
            updateHighScore();

        } else {
            setCorrectOptionFormatted("bg-red-200");
            setCorrect(false);
            setWrongAnswers(wrongAnswers + 1);
            setTotalAnswers(totalAnswers + 1);
        }
        setAccuracy(((correctAnswers / totalAnswers) * 100).toFixed(2));
    }
    const updateHighScore = async () => {
        try {
            const response = await axios.get(`/api/highscore?email=${session.user.email}`);
            const highScore = response.data.highscore;
            setHighScore(highScore);
            console.log(score, highScore);
            if (score > highScore) {
                console.log(score, highScore);
                await axios.post('/api/highscore', {email: session.user.email,  highscore: score });
                setHighScore(score);
                console.log('New high score updated!');
            } else {
                console.log('Score did not beat the high score.');
            }
        } catch (error) {
            console.error('Error fetching or updating high score:', error);
        }
    };

    const nextQuestion = () => {
        setCorrect(false);
        setSelected('');
        getRandomDestination();
        updateHighScore();
        
    }

    const generateImageAndShare = async () => {
        if (cardRef.current) {
            try {
                const dataUrl = await domtoimage.toPng(cardRef.current);
                setImageUrl(dataUrl); // Store the generated image URL
            } catch (error) {
                console.error("Image generation failed:", error);
            }
        }


    };

    const shareImage = () => {
        const customLink = `https://globetrotter-plum.vercel.app/?score=${score}`;
        const message = `🌍 I just played Globetrotter!\n💯 Score: ${score}\n \nCan you beat my score? Check it out here: ${customLink}`;
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}&url=${encodeURIComponent(imageUrl)}`;

        window.open(whatsappURL, "_blank");
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
                            <div><span className='font-bold text-sky-400'>Clue 1: </span>{randomDestination.correctDestination.clues[0]}</div>
                            <div><span className='font-bold text-sky-400'>Clue 2: </span>{randomDestination.correctDestination.clues[1]}</div>
                        </div>
                        : <div><span className='font-bold text-sky-400'>Clue 1: </span>{randomDestination.correctDestination.clues[0]}</div>}
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


            <div className={`options ${selected !== '' && "cursor-not-allowed"} grid grid-cols-1 md:grid-cols-2 gap-4 w-full`}>
                {options[0].map((option, index) => (
                    <div key={index}>
                        <button
                            disabled={selected !== "" && selected !== randomDestination.correctDestination.city}
                            className={`option
                        ${(randomDestination.correctDestination.city !== selected) && selected === option && correctOptionFormatted} 
                        ${(randomDestination.correctDestination.city === selected) && randomDestination.correctDestination.city === option && correctOptionFormatted} 
                        ${(randomDestination.correctDestination.city === selected) && randomDestination.correctDestination.city !== option && "bg-sky-50"}
                        ${(randomDestination.correctDestination.city !== selected) && selected !== option && "bg-sky-50"}
                        py-3 px-4 w-full rounded-lg text-left transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm border-2 
                        ${(selected !== "") && selected !== randomDestination.correctDestination.city ? "cursor-not-allowed opacity-50" : ""} `}
                            onClick={() => checkAnswer(option)}>
                            {option}
                        </button>
                    </div>
                ))}
            </div>

            {selected &&
                <div>
                    <Fact isCorrect={correct}  fact={randomDestination.correctDestination.fun_fact[0]} onNextGame={nextQuestion} />
                    <div ref={cardRef} id='score-card'>
                        <ScoreCard score={score} highscore={highScore} correctAnswers={correctAnswers} totalAnswers={totalAnswers} accuracy={accuracy} />
                    </div>

                    <Dialog>
                        <DialogTrigger>
                            <button
                                onClick={generateImageAndShare}
                                className="bg-green-500 text-white p-2 rounded mt-4 w-full"
                            >
                                Challenge a friend
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Share on whatsapp</DialogTitle>
                                <DialogDescription>
                                    Let them know your score!
                                    <img src={imageUrl} alt="Score Card" />
                                    <button className='p-2 mt-2 bg-sky-100 text-black rounded-2xl' onClick={shareImage}>Share</button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>


                </div>}




        </section>
    )
}

export default Quiz;