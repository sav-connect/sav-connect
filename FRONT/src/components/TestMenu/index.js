// == Import npm
import React from 'react';
import { Menu } from 'semantic-ui-react'

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

//Import store actions
import { seeClients,
         seeClientForm,
         seeArchives,
         enterMainPage,
         seeWorkers,
         seeCardForm,
         seeProducts,
         seeArticleForm,
         seeWorkerForm,
       } from 'src/store/actions';

const TestMenu = () => {
    return (
        <div>test</div>
    )
};

export default TestMenu;