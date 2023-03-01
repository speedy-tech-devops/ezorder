import axios from 'axios';
import { FETCH_ALL_DATA , LOGIN_APP } from '../constants/app';
import { baseUrl } from '../services/endpoint';
const dataFetch = data => ({
  type: FETCH_ALL_DATA,
  data,
});

const dataLogin = user => ({
  type: LOGIN_APP,
  user,
});
export const fetchDataAll = () => dispatch => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      dispatch(dataFetch(response.data));
    })
}
export const Login_app = (email,password) => dispatch => {
  var data = JSON.stringify({
    "email": email,
    "password": password
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: baseUrl+'/v1/auth/merchant/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  return axios(config)
  .then(function (response) {
  
  dispatch(dataLogin(response.data));
  return response.data
})
.catch(function (error) {
  console.log(error);
});
}