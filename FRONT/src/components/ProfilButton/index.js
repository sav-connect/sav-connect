// == Import npm
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Dropdown } from 'semantic-ui-react'

//Import store actions
import { seeProfilPage, log_out } from 'src/store/actions';

const ProfilButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="profilButton">
    <Dropdown item text='' icon='user'>
       <Dropdown.Menu>
         <Dropdown.Item
         onClick={(evt) => {dispatch(seeProfilPage(history));}}
         >
         Profil
        </Dropdown.Item>
       <Dropdown.Item
         onClick={(evt) => {dispatch(log_out(history));}}
         >Se deconnecter
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
};

export default ProfilButton;










