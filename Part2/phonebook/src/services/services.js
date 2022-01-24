import axios from "axios"
const URL = "http://localhost:3001/persons"

const getAll = () => {
    const respuesta = axios.get(URL)
    return respuesta.then(response => response.data)
}

const postIt = (data) => {
    const respuesta = axios.post(URL, data)
    return respuesta.then(response => response.data)
}

const deleteIt = (id) => {
    const respuesta = axios.delete(`${URL}/${id}`)
    return respuesta.then(response => response.status)
}

const putIt = (id, data) => {
    const respuesta = axios.put(`${URL}/${id}`, data)
    return respuesta.then(response => response.data)
}

export default { getAll, postIt, deleteIt, putIt }