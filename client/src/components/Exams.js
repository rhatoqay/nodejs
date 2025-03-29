import React, { useState, useEffect } from "react";
import { getExams, createExam } from "../Api";  // Ensure correct import of the API functions

function Exams() {
  const [exams, setExams] = useState([]); // State to hold the list of exams
  const [loading, setLoading] = useState(true); // Loading state
  const [newExamTitle, setNewExamTitle] = useState(""); // State for new exam title
  const [newExamSubject, setNewExamSubject] = useState(""); // State for new exam subject

  useEffect(() => {
    // Fetch exams when the component mounts
    const fetchExams = async () => {
      try {
        const data = await getExams(); // Fetch exams data
        setExams(data); // Set the exams to state
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchExams();
  }, []);

  // Handle creating a new exam
  const handleCreateExam = async (e) => {
    e.preventDefault();
    const examData = {
      title: newExamTitle,
      subject: newExamSubject, // assuming exams need a subject
    };

    try {
      const newExam = await createExam(examData); // API call to create exam
      setExams([...exams, newExam]); // Add the new exam to the list
      setNewExamTitle(""); // Clear title input
      setNewExamSubject(""); // Clear subject input
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div>
      <h1>Available Exams</h1>

      {/* Create Exam Form */}
      <form onSubmit={handleCreateExam}>
        <div>
          <label htmlFor="title">Exam Title:</label>
          <input
            type="text"
            id="title"
            value={newExamTitle}
            onChange={(e) => setNewExamTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={newExamSubject}
            onChange={(e) => setNewExamSubject(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Exam</button>
      </form>

      {/* Display Exams */}
      {loading ? (
        <p>Loading...</p>
      ) : exams.length > 0 ? (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id}>{exam.title}</li> // Assuming exams have 'id' and 'title'
          ))}
        </ul>
      ) : (
        <p>No exams available.</p>
      )}
    </div>
  );
}

export default Exams;