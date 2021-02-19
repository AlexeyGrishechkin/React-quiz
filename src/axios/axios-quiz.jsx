import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-7bf47-default-rtdb.firebaseio.com/'
})