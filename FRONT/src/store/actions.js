// Sync Actions:
export const SYNC_PASSWORD = 'actions/SYNC_PASSWORD';
export const SYNC_MAIL = 'actions/SYNC_MAIL';
export const SYNC_FIRSTNAME = 'actions/SYNC_FIRSTNAME';
export const SYNC_TEXT = 'actions/SYNC_TEXT';


// Routes actions:
export const ENTER_MAINPAGE = 'actions/ENTER_MAINPAGE';
export const SEE_PROFILPAGE = 'actions/SEE_PROFILPAGE';
export const SEE_CLIENTS = 'actions/SEE_CLIENTS';
export const SEE_CLIENTFORM = 'actions/SEE_CLIENTFORM';
export const SEE_ARCHIVES = 'actions/SEE_ARCHIVES';
export const SEE_WORKERS = 'actions/SEE_WORKERS';
export const SEE_CARDFORM = 'actions/SEE_CARDFORM';
export const SEE_ARTICLEFORM = 'actions/SEE_ARTICLEFORM';
export const SEE_WORKERFORM = 'actions/SEE_WORKERFORM';
export const SEE_PRODUCTS = 'actions/SEE_PRODUCTS';
export const SEE_NEW_CLIENTFORM = 'actions/SEE_NEW_CLIENTFORM';
export const SEE_NEW_CARDFORM = 'actions/SEE_NEW_CARDFORM';
export const SEE_BREAKDOWN_FORM = 'actions/SEE_BREAKDOWN_FORM';
export const SEE_BREAKDOWN = 'actions/SEE_BREAKDOWN';
export const SEE_NEW_BREAKDOWNFORM = 'actions/SEE_NEW_BREAKDOWNFORM';
export const SEE_TAG_LIST = 'actions/SEE_TAG_LIST';
export const SEE_TAG_FORM = 'actions/SEE_TAG_FORM';
export const SEE_ACTIONLIST = 'actions/SEE_ACTIONLIST';
export const SEE_ACTIONFORM = 'actions/SEE_ACTIONFORM';
export const SEE_EDIT_ARTICLEFORM = 'actions/SEE_EDIT_ARTICLEFORM';
export const SEE_EDIT_TAGFORM = 'actions/SEE_EDIT_TAGFORM';
export const SEE_EDIT_ACTIONFORM = 'action/SEE_EDIT_ACTIONFORM';


// Login Action:
export const LOGIN = 'actions/LOGIN';
export const LOG_OUT = 'actions/LOG_OUT';


// ACTION: an action is used to change the state or to trigger an effect.
// An action takes the form of an object: { type: NOM_DE_L'ACTION, [payload] }

// ACTION CREATOR: this a fonction that returns an action

// Action triggered when someone write on inputs
export const syncPassword = (password) => ({
  type: SYNC_PASSWORD,
  password,
});
export const syncMail = (mail) => ({
  type: SYNC_MAIL,
  mail,
});
export const syncText = (result) => ({
  type: SYNC_TEXT,
  result,
});


// Routes Actions
export const enterMainPage = (history) => ({ type: ENTER_MAINPAGE, history });
export const seeProfilPage = (history) => ({ type: SEE_PROFILPAGE, history });
export const seeClients = (history) => ({ type: SEE_CLIENTS, history });
export const seeClientForm = (history) => ({ type: SEE_CLIENTFORM, history });
export const seeArchives = (history) => ({ type: SEE_ARCHIVES, history });
export const seeWorkers = (history) => ({ type: SEE_WORKERS, history });
export const seeCardForm = (history) => ({ type: SEE_CARDFORM, history });
export const seeArticleForm = (history) => ({ type: SEE_ARTICLEFORM, history });
export const seeWorkerForm = (history) => ({ type: SEE_WORKERFORM, history });
export const seeProducts = (history) => ({ type: SEE_PRODUCTS, history });
export const seeNewClientForm = (history) => ({ type: SEE_NEW_CLIENTFORM, history });
export const seeNewCardForm = (history) => ({ type: SEE_NEW_CARDFORM, history });
export const seeBreakdownForm = (history) => ({ type: SEE_BREAKDOWN_FORM, history });
export const seeBreakdown = (history) => ({ type: SEE_BREAKDOWN, history });
export const seeNewBreakdownForm = (history) => ({ type: SEE_NEW_BREAKDOWNFORM, history });
export const seeTagList = (history) => ({ type: SEE_TAG_LIST, history });
export const seeTagForm = (history) => ({ type: SEE_TAG_FORM, history });
export const seeActionList = (history) => ({ type: SEE_ACTIONLIST, history });
export const seeActionForm = (history) => ({ type: SEE_ACTIONFORM, history });
export const seeEditArticleForm = (history) => ({ type: SEE_EDIT_ARTICLEFORM , history });
export const seeEditTagForm = (history) => ({ type: SEE_EDIT_TAGFORM, history });
export const seeEditActionForm = (history) => ({ type: SEE_EDIT_ACTIONFORM, history });

// Login Action
export const login = (history) => ({ type: LOGIN, history });
export const log_out = (history) => ({ type: LOG_OUT, history });
