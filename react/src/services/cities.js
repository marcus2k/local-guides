import axios from 'axios';

const extractCitiesList = lst => {
    console.log(lst);
    return lst
    .map(obj => obj.cities.map(city => city + ", " + obj.country))
    .reduce((a, b) => a.concat(b), []);
}

const getAllCities = () => 
    axios
    .get('https://countriesnow.space/api/v0.1/countries')
    .then(res => extractCitiesList(res.data.data))

export default { getAllCities };
