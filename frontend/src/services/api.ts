import axios from 'axios';
import { ResumeData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

export const getResumeData = async (): Promise<ResumeData> => {
    const response = await axios.get(`${API_BASE_URL}/resume/`);
    return response.data;
};

export const sendMessage = async (message: string): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/chat/`, { message });
    return response.data.reply;
};
