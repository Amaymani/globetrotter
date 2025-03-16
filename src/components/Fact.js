import React from 'react'
import { Check, Frown } from 'lucide-react'
import { OptionCard } from './ui/card'

const Fact = ({ isCorrect, fact, onNextGame }) => {
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

            <h3 className="text-3xl text-white font-bold mb-10">
                {isCorrect ? "🎉 Correct! Well done!" : "😢 Oops! Not quite right."}
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
                className="mt-8 px-8 py-4 shadow-lg border-4 border-white text-xl font-bold text-white uppercase rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
                🌍 Next Destination
            </OptionCard>
        </div>
    )
}

export default Fact