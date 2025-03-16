import React from 'react'
import { Trophy, Check, X } from 'lucide-react'

const ScoreCard = ({score,  correctAnswers, totalAnswers, accuracy, highscore}) => {

  return (
    <div  className=" p-6 mt-8 w-full animate-fade-in">
      <div className='flex justify-center font-bold'>Highscore:{score>highscore?score:highscore}</div>
      <h3 className="text-3xl font-bold mb-6 flex items-center text-white justify-center">
        <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
        Your Stats
      </h3>
      
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-blue-100 rounded-xl flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-700">{score}</div>
          <div className="text-sm text-gray-700 mt-2">Total Score</div>
        </div>
        
        <div className="p-6 bg-green-100 rounded-xl flex flex-col items-center">
          <div className="text-3xl font-bold text-green-700 flex items-center">
            <Check className="h-6 w-6 mr-2" /> {correctAnswers}
          </div>
          <div className="text-sm text-gray-700 mt-2">Correct</div>
        </div>
        
        <div className="p-6 bg-red-100 rounded-xl flex flex-col items-center">
          <div className="text-3xl font-bold text-red-700 flex items-center">
            <X className="h-6 w-6 mr-2" /> {totalAnswers - correctAnswers}
          </div>
          <div className="text-sm text-gray-700 mt-2">Incorrect</div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="text-base text-gray-200 mb-2 flex justify-between">
          <span>Accuracy</span>
          <span className="font-semibold">{accuracy}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div 
            className="bg-blue-600 rounded-full h-3 transition-all duration-700 ease-out"
            style={{ width: `${accuracy}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ScoreCard