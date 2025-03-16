import React, {useState, useEffect} from 'react'
import { Check, Frown } from 'lucide-react'
import { OptionCard } from './ui/card'

const Fact = ({ isCorrect, fact, onNextGame }) => {
    const [randomMsg, setRandomMsg] = useState('');

    useEffect(() => {
        getRandomMsg();
    }, []);


    const getRandomMsg = () => {
        const correctAnswerMessages = [
            "You Got It! 🎉",
            "Right on Target! ✅",
            "You’re a True Globetrotter! 🌍",
            "Great Job! You Nailed It! 🎯",
            "Perfect! You're on Fire! 🔥",
            "Explorer Mode: Activated! 🚀",
            "You’re a Travel Genius! 🏆",
            "Bullseye! You Got It Right! 🎯",
            "You Just Earned Your Next Travel Stamp! 📍",
            "Globetrotter Confirmed! 🌍",
            "Your Passport Just Got Another Stamp! 🎟",
            "Next Stop: Victory! 🏁",
            "You're Packed and Ready for the Next Destination! 🧳",
            "You're on a Winning Streak! ⚡",
            "Champion Move! 🏅",
            "Rolling High! Keep Going! 🎲",
            "Brilliant Answer! Keep the Streak Alive! ✨",
            "Legendary Guess! ⭐"
        ];

        const randomMessage = correctAnswerMessages[Math.floor(Math.random() * correctAnswerMessages.length)];
        setRandomMsg(randomMessage);
    };


    return (
        <div className="text-center px-6 py-8">
            <div className="flex justify-center mb-6">
                {isCorrect ? (
                    <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center animate-bounce">
                        <Check className="h-12 w-12 text-green-700" />
                    </div>
                ) : (
                    <div className="w-20 h-20 rounded-full bg-red-200 flex items-center justify-center animate-bounce">
                        <Frown className="h-12 w-12 text-red-700" />
                    </div>
                )}
            </div>

            <h3 className="text-3xl text-[#6A0DAD] font-bold mb-10">
                {isCorrect ? randomMsg : "Good try! You'll get the next one! 😊"}
            </h3>

            {fact && (
                <div className="mt-6 p-6 bg-sky-100 border-l-4 mb-4 border-sky-500 rounded-3xl animate-fade-in">
                    <p className="text-balance text-lg font-medium text-gray-800">
                        <span className="font-bold text-sky-600">Fun Fact:</span> {fact}
                    </p>
                </div>
            )}

            <OptionCard
                color='bg-green-500'
                onClick={onNextGame}
                className="mt-8 px-8 py-4 shadow-lg border-4 border-white  text-xl font-bold text-white uppercase rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
                🌍 Next Destination
            </OptionCard>
        </div>
    )
}

export default Fact