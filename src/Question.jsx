import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/questions")
      .then((response) => setQuestions(response.data));
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ([ ...prevAnswers, { [questionId]: selectedOption},
    ]));
  };

  const sendAnswers = () => {
    axios
      .post("http://localhost:3000/answers",{  answers : userAnswers  })
      .then((response) => setScore(response.data.score));
  };
  return (
    <div className="m-16 border border-black p-16 shadow-md ">
      <h1 className="text-8xl font-bold m-14  text-center">Take the Quiz</h1>
      <h2 className="text-4xl font-bold m-2">Questions:</h2>
      {questions.map((question, id) => (
        <div
          key={id}
          className="flex flex-col gap-1 m-4 text-xl font-medium"
        >
          <h3>{question.question}</h3>
          {question.options.map((option, optionId) => (
            <div key={optionId}>
              <input
                type="radio"
                id={`answer-${id}-${optionId}`}
                name={`question-${id}`}
                value={option}
                checked={userAnswers[id] === option}
                onChange={() => handleAnswerChange(id, option)}
              />
              <label htmlFor={`answer-${id}-${optionId}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="text-right">
        <button
          className="p-4 m-4  bg-black text-white text-lg"
          onClick={sendAnswers}
        >
          See the score
        </button>
      </div>
      {score !== null && (
        <p className="text-2xl font-semibold">Your score is: {score}</p>
      )}
    </div>
  );
};
