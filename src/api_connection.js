import axios from 'axios'

export const API = axios.create({
  baseURL: `http://semikolsf1.azurewebsites.net/api/Season/`,
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
