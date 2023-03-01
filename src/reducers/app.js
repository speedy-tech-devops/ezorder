import { FETCH_ALL_DATA , LOGIN_APP} from '../constants/app';

const initialState = {
  data: [],
  user : []
}

export const app = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return {
        data: action.data
    }
    case LOGIN_APP:
      return {
        user: action.user
    }
    default:
      return state;
  }
}