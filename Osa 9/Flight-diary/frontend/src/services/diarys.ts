import axios from "axios";
import { Diary } from "../types";

const apiBaseUrl = 'http://localhost:3000/api';

const getAll = async () => {
    const data = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
    return data;
};

export default {
    getAll
};