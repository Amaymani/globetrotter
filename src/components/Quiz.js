import React from 'react'
import { Badge } from './ui/badge'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { QuestionCard, OptionCard } from "@/components/ui/card";
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
        setShowNextClue(false);
        
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
            <Badge className={"bg-transparent text-md mb-2  text-purple-800"}>Answer & Unlock Your Next Stop! ✈</Badge>


            <QuestionCard className="question text-xl bg-sky-50 p-6 min-h-[120px] max-w-[76rem] rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 transform relative">
                <span className="text-center">
                    {showNextClue ? (
                        <div>
                            <div>
                                <span className="font-bold  text-yellow-500">Clue 1: </span>
                                {randomDestination.correctDestination.clues[0]}
                            </div>
                            <div>
                                <span className="font-bold text-yellow-500">Clue 2: </span>
                                {randomDestination.correctDestination.clues[1]}
                            </div>
                        </div>
                    ) : (
                        <div className='text-black font-semibold'>
                            <span className="font-bold text-yellow-500">Clue 1: </span>
                            {randomDestination.correctDestination.clues[0]}
                        </div>
                    )}
                </span>

                {!showNextClue && (
                    <button
                        onClick={() => setShowNextClue(true)}
                        className="absolute bottom-2 right-2 text-gray-600 px-3 py-1 text-lg font-bold rounded-xs hover:text-purple-400 transition duration-300"
                    >
                        More Clues, Please!💡

                    </button>
                )}
            </QuestionCard>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full justify-center pt-3 items-center">
                {options[0].map((option, index) => (
                    <div key={index} className="group flex justify-center">
                        <OptionCard
                            option="Play"
                            disabled={!!selected} // Disable after selection
                            className={`py-5 px-8 w-full max-w-md h-20 rounded-2xl text-center font-bold text-xl transition-all`}
                            onClick={() => checkAnswer(option)}
                        >
                            {option}
                        </OptionCard>
                    </div>
                ))}
            </div>

            {selected && (
                <div className="mt-10">
                    <Fact isCorrect={correct} fact={randomDestination.correctDestination.fun_fact[0]} onNextGame={nextQuestion} />
                    <div ref={cardRef} id='score-card'>
                        <ScoreCard score={score} highscore={highScore} correctAnswers={correctAnswers} totalAnswers={totalAnswers} accuracy={accuracy} />
                    </div>

                    <Dialog>
                        <DialogTrigger className="w-full flex justify-center">
                            <button
                                onClick={() => generateImageAndShare(cardRef)}
                                className="bg-green-400 text-white p-2 rounded mt-4 max-w-xs"
                            >
                                Challenge a friend
                            </button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Share on whatsapp</DialogTitle>
                                <DialogDescription>
                                    Let them know your score!
                                    {imageUrl && <img src={imageUrl} alt="Score Card" className="w-full rounded-lg" />}
                                    <button className='p-2 mt-2 bg-sky-100 text-black rounded-2xl' onClick={shareImage}>Share</button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            )}




        </section>
    )
}

export default Quiz;