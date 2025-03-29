import React, { useEffect, useState } from "react";

const Answers = () => {
    const [answers, setAnswers] = useState([]);

    // Fetch all answers when the component loads
    useEffect(() => {
        fetch("http://localhost:5000/answers") // Ensure this matches your API endpoint
            .then((res) => res.json())
            .then((data) => setAnswers(data))
            .catch((error) => console.error("Error fetching answers:", error));
    }, []);

    return (
        <div>
            <h2>Student Answers</h2>
            {answers.length > 0 ? (
                <ul>
                    {answers.map((answer) => (
                        <li key={answer.id}>
                            User {answer.user_id} answered Question {answer.question_id}: {answer.answer_text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No answers found.</p>
            )}
        </div>
    );
};

export default Answers;