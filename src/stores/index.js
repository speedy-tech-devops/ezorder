// import reducers from '../reducers'
// import { createLogger } from 'redux-logger'
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'

// const middleware = [ thunk ];

// if (process.env.NODE_ENV === 'development') {
//   middleware.push(createLogger())
// }

// const store = createStore(
//   reducers,
//   applyMiddleware(...middleware)
// );

// export default store;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import orderSlice from '../features/orderSlice'
import tableSlice from '../features/tableSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderSlice,
        table : tableSlice
    },
})

export default store