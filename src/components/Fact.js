import React from 'react'
import { Check, Frown } from 'lucide-react'


const Fact = ({ isCorrect, fact, onNextGame }) => {
    return (
        <div className="glass-card p-6 text-center drop-shadow-lg">
            <div className="flex justify-center mb-4">
                {isCorrect ? (
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce-in">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-bounce-in">
                        <Frown className="h-8 w-8 text-red-600" />
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold mb-2">
                {isCorrect ? "Correct! Well done!" : "Oops! Not quite right."}
            </h3>

            {fact && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-fade-in">
                    <p className="text-balance text-sm font-medium">
                        <span className="font-bold">Fun Fact:</span> {fact}
                    </p>
                </div>
            )}

            <button
                onClick={onNextGame}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
                Next Destination
            </button>
        </div>
    )
}

export default Fact