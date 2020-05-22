// == Import npm
import React from 'react';
import { Menu } from 'semantic-ui-react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


// Import store actions
import {
  seeWorkers,
  seeWorkerForm,
  seeBreakdownForm,
  seeBreakdown,
  seeTagList,
  seeTagForm,
  seeActionList,
  seeActionForm,
} from 'src/store/actions';

const showSubMenu = (event) => {
  const subMenus = document.querySelectorAll('.item .menu');
  console.log(subMenus);
  for (let i = 0; i < subMenus.length; i++) {
    subMenus[i].classList.remove('show');
  }
  const subMenu = event.target.querySelector('.menu');
  if (subMenu.classList.contains('show')) {
    subMenu.classList.remove('show');
  }
  else {
    subMenu.classList.add('show');
  }
};

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Menu.Item text="Employés" as="div" onClick={showSubMenu}>
        Employés
        <Menu.Menu>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeWorkers(history));
            }}
          >
            Liste des employés
          </Menu.Item>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeWorkerForm(history));
            }}
          >
            Créer une fiche employé
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item text="Employés" as="div" onClick={showSubMenu}>
        Pannes
        <Menu.Menu>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeBreakdown(history));
            }}
          >
            Liste des pannes
          </Menu.Item>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeBreakdownForm(history));
            }}
          >
            Créer une panne
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item text="Tags" as="div" onClick={showSubMenu}>
        Tags
        <Menu.Menu>
          <Menu.Item
            onClick={(event) => {
              dispatch(seeTagList(history));
            }}
          >
            Liste des tags
          </Menu.Item>
          <Menu.Item
            onClick={(event) => {
              dispatch(seeTagForm(history));
            }}
          >
            Créer un tag
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item text="Actions" as="div" onClick={showSubMenu}>
        Actions
        <Menu.Menu>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeActionList(history));
            }}
          >
            Liste des actions
          </Menu.Item>
          <Menu.Item
            onClick={(evt) => {
              dispatch(seeActionForm(history));
            }}
          >
            Créer une action
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </>
  );
};

const none = () => (
  <>
  </>
);


// == Composant
const AdminMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  if (props.admin === 'false') {
    return none();
  }
  return Admin();
};

export default AdminMenu;
