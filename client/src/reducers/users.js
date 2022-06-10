import { GET_ALL_USERS } from '../constants/actionTypes';

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    default:
      return users;
  }
};

export default usersReducer;
