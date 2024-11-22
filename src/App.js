import React, { useState } from "react";
import questions from "./questions.json";
import jobs from "./jobs.json";
import Confetti from "react-confetti";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerArr, setAnswerArr] = useState([]);
  const [showJobs, setShowJobs] = useState(false);

  const handleButtonClick = (e) => {
    setAnswerArr((prevArray) => [...prevArray, e.target.value]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowJobs(true);
    }
  };

  // Filter jobs based on selected answers
  const filteredJobs = jobs.filter((job) => {
    const matchingFilters = job.filters.filter((filter) =>
      answerArr.includes(filter)
    );
    return matchingFilters.length > 2; // Only include jobs with more than 3 matching filters
  });

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswerArr([]);
    setShowJobs(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {showJobs ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Recommendations
          </h2>

          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={250}
            gravity={0.4}
          />

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.job}
                className="border-b border-gray-300 py-4 last:border-none"
              >
                <h3 className="text-xl font-medium text-gray-700">{job.job}</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No jobs match your selected preferences.
            </p>
          )}
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => handleReset()}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
          <div className="mb-6">
            <p className="text-lg text-gray-700 font-medium">
              Question: {currentQuestion + 1}/{questions.length}
            </p>
            <h1 className="text-2xl font-semibold text-gray-800 mt-2">
              {questions[currentQuestion].questionText}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQuestion].answerOptions.map((x) => (
              <button
                key={x.answerText}
                value={x.dataAttribute}
                onClick={handleButtonClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {x.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
