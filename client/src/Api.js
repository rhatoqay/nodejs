import axios from "axios";

const API_URL = "http://localhost:5000"; // Update with your server URL if necessary

// Fetch all exams
export const getExams = async () => {
    try {
        const response = await axios.get(`${API_URL}/exams`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exams", error);
        throw error;
    }
};

// Fetch specific exam
export const getExam = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/exams/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exam", error);
        throw error;
    }
};

// Create a new exam
export const createExam = async (examData) => {
    try {
        const response = await axios.post(`${API_URL}/exams`, examData);
        return response.data;
    } catch (error) {
        console.error("Error creating exam", error);
        throw error;
    }
};

