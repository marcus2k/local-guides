import axios from 'axios';

const baseUrl = '/api/guides';

const getAllGuides = () => 
    axios
    .get(baseUrl + '/list')
    .then(res => res.data);

const getAllCities = () => 
    axios
    .get(baseUrl + '/cities')
    .then(res => res.data);

const getCityGuides = (city) => 
    axios
    .get(baseUrl + `/city/${city}`)
    .then(res => res.data);

const getUserProfile = (email) => 
    axios
    .get(baseUrl + `/email/${email}`)
    .then(res => res.data)

export default { getAllGuides, getAllCities, getCityGuides, getUserProfile };