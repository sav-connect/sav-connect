// Import Actions
import {
  SYNC_PASSWORD,
  SYNC_MAIL,
  SYNC_TEXT,
} from './actions';

const initialState = {
  password: '',
  mail: '',
  result: '',
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }
    case SYNC_MAIL: {
      return {
        ...state,
        mail: action.mail,
      };
    }
    case SYNC_TEXT: {
      return {
        ...state,
        result: action.result,
      };
    }
    default: {
      return state;
    }
  }
};
