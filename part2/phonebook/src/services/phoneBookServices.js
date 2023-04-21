import axios from "axios";
const baseURL = 'http://localhost:3001/persons';

const getAllPersons = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const createNewPersons = (newPersons) => {
    const request = axios.post(baseURL, newPersons);
    return request.then(response => response.data);
};
const updatePersonsByID = (id, newData) => {
    const request = axios.put(`${baseURL}/${id}`, newData);
    return request.then(response => response.data);
};

const deletePersonById = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

// eslint-disable-next-line
export default {
    getAllPersons,
    createNewPersons,
    updatePersonsByID,
    deletePersonById
}