import React from 'react'
import { Trophy, Check, X } from 'lucide-react'



const ScoreCard = ({score, correctAnswers, totalAnswers, accuracy}) => {

  return (
    <div  className=" p-6 mt-8 w-full animate-fade-in">
    <h3 className="text-lg font-semibold mb-4 flex items-center">
      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
      Your Stats
    </h3>
    
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="p-3 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-primary">{score}</div>
        <div className="text-xs text-gray-600 mt-1">Total Score</div>
      </div>
      
      <div className="p-3 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
          <Check className="h-4 w-4 mr-1" /> {correctAnswers}
        </div>
        <div className="text-xs text-gray-600 mt-1">Correct</div>
      </div>
      
      <div className="p-3 bg-red-50 rounded-lg">
        <div className="text-2xl font-bold text-red-600 flex items-center justify-center">
          <X className="h-4 w-4 mr-1" /> {totalAnswers - correctAnswers}
        </div>
        <div className="text-xs text-gray-600 mt-1">Incorrect</div>
      </div>
    </div>
    
    <div className="mt-4">
      <div className="text-sm text-gray-600 mb-1 flex justify-between">
        <span>Accuracy</span>
        <span className="font-medium">{accuracy}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary rounded-full h-2 transition-all duration-700 ease-out"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  </div>
  )
}

export default ScoreCard