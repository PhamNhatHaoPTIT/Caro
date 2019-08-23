import { createStore } from 'redux';
import reducer from '../reducer/AllReducer';

const Store = createStore(reducer);

export default Store;