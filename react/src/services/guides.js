import axios from 'axios';

const baseUrl = '/api/guides';

const getAllGuides = () => 
    axios
    .get(baseUrl)
    .then(res => res.data);

const getAllCities = () => 
    axios
    .get(baseUrl + '/cities')
    .then(res => res.data);

export default { getAllGuides, getAllCities };