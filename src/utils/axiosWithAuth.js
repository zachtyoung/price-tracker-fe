import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('priceToken');

  return axios.create({
    headers: {
      Authorization: token
    }
  });
};
