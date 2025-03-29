import React, { useEffect, useState } from "react";

const ExamTakers = () => {
    const [examTakers, setExamTakers] = useState([]);

    // Fetch all exam takers when the component loads
    useEffect(() => {
        fetch("http://localhost:5000/exam_takers") // Adjust the API endpoint if needed
            .then((res) => res.json())
            .then((data) => setExamTakers(data))
            .catch((error) => console.error("Error fetching exam takers:", error));
    }, []);

    return (
        <div>
            <h2>Exam Takers</h2>
            {examTakers.length > 0 ? (
                <ul>
                    {examTakers.map((taker) => (
                        <li key={taker.id}>
                            User {taker.user_id} took Exam {taker.exam_id} 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No exam takers found.</p>
            )}
        </div>
    );
};

export default ExamTakers;