import axios from 'axios'
import { UTILS } from '../constants/utils'

const api = axios.create({
  baseURL: UTILS.api,
})

export default api
