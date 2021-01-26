import axios from 'axios'
export default axios.create (
    {
        baseURL: 'https://werun-a7b97-default-rtdb.firebaseio.com/'
    }
)