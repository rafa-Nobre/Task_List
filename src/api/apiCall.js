import axios from 'axios'

export default axios.create({
  baseURL: 'https://64f653202b07270f705e644c.mockapi.io/',
  headers: { 'content-type': 'application/json' }
})
