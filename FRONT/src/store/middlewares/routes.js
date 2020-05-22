
// Middleware to manage route changes

// == Import actions
import {
  ENTER_MAINPAGE,
  SEE_PROFILPAGE,
  SEE_CLIENTS,
  SEE_CLIENTFORM,
  SEE_ARCHIVES,
  SEE_WORKERS,
  SEE_CARDFORM,
  LOG_OUT,
  SEE_WORKERFORM,
  SEE_PRODUCTS,
  SEE_ARTICLEFORM,
  SEE_NEW_CLIENTFORM,
  SEE_NEW_CARDFORM,
  SEE_BREAKDOWN_FORM,
  SEE_BREAKDOWN,
  SEE_NEW_BREAKDOWNFORM,
  SEE_TAG_FORM,
  SEE_TAG_LIST,
  SEE_ACTIONLIST,
  SEE_ACTIONFORM,
  SEE_EDIT_ARTICLEFORM,
  SEE_EDIT_TAGFORM,
  SEE_EDIT_ACTIONFORM,
} from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case ENTER_MAINPAGE: {
      action.history.push('/dashboard/1');
      break;
    }
    case SEE_PROFILPAGE: {
      action.history.push('/profil');
      break;
    }
    case SEE_CLIENTS: {
      action.history.push('/clientlist/1');
      break;
    }
    case SEE_CLIENTFORM: {
      action.history.push('/newclient');
      break;
    }
    case SEE_NEW_CLIENTFORM: {
      action.history.push('/getnewclient');
      break;
    }
    case SEE_ARCHIVES: {
      action.history.push('/archivelist/1');
      break;
    }
    case SEE_EDIT_ARTICLEFORM: {
      action.history.push('/editarticleform/:id');
      break;
    }
    case SEE_PRODUCTS: {
      action.history.push('/articlelist/1');
      break;
    }
    case SEE_ARTICLEFORM: {
      action.history.push('/articleform');
      break;
    }
    case SEE_WORKERS: {
      action.history.push('/workerlist');
      break;
    }
    case SEE_WORKERFORM: {
      action.history.push('/workerform');
      break;
    }
    case SEE_CARDFORM: {
      action.history.push('/formtab');
      break;
    }
    case SEE_NEW_CARDFORM: {
      action.history.push('/newformtab/');
      break;
    }
    case SEE_BREAKDOWN_FORM: {
      action.history.push('/break');
      break;
    }
    case SEE_BREAKDOWN: {
      action.history.push('/breaklist');
      break;
    }
    case SEE_NEW_BREAKDOWNFORM: {
      action.history.push('/getnewbreak');
      break;
    }
    case SEE_ACTIONLIST: {
      action.history.push('/actionlist');
      break;
    }
    case SEE_ACTIONFORM: {
      action.history.push('/actionform');
      break;
    }
    case SEE_EDIT_ACTIONFORM: {
      CaretPosition.history.push('/editactionform');
      break;
    }
    case SEE_TAG_FORM: {
      action.history.push('/tagform');
      break;
    }
    case SEE_EDIT_TAGFORM: {
      action.history.push('/edittagform/:id');
      break;
    }
    case SEE_TAG_LIST: {
      action.history.push('/tags');
      break;
    }
    case LOG_OUT: {
      action.history.push('/');
      break;
    }
    default: {
      next(action);
    }
  }
};
