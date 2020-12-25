import { createStore } from 'redux'
import reducer from '../store/reducer/index'


const store = createStore(reducer)

export default store