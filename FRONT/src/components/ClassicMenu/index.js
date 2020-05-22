// == Import npm
import React from 'react';
import { Menu } from 'semantic-ui-react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// Import store actions
import {
  seeClients,
  seeClientForm,
  seeArchives,
  enterMainPage,
  seeCardForm,
  seeProducts,
  seeArticleForm,
} from 'src/store/actions';

import AdminMenu from '../AdminMenu';

const showSubMenu = (event) => {
  const subMenus = document.querySelectorAll('.item .menu');
  console.log(subMenus);
  for (let i = 0; i < subMenus.length; i++) {
    subMenus[i].classList.remove('show');
  }
  const subMenu = event.target.querySelector('.menu');
  if (subMenu) {
    if (subMenu.classList.contains('show')) {
      subMenu.classList.remove('show');
    }
    else {
      subMenu.classList.add('show');
    }
  }
};

// == Composant
const ClassicMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="navbar">
      <Menu fluid vertical>
        <Menu.Item text="SAV" as="div" onClick={showSubMenu}>
          SAV
          <Menu.Menu>
            <Menu.Item
              // name="Liste des réparations"
              onClick={(evt) => {
                dispatch(enterMainPage(history));
              }}
            >
              Liste des réparations
            </Menu.Item>
            <Menu.Item
              onClick={(evt) => {
                dispatch(seeCardForm(history));
              }}
            >
              Créer une fiche SAV
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item text="Clients" as="div" onClick={showSubMenu}>
          Clients
          <Menu.Menu>
            <Menu.Item
              onClick={(evt) => {
                dispatch(seeClients(history));
              }}
            >Liste des clients
            </Menu.Item>
            <Menu.Item
              onClick={(evt) => {
                dispatch(seeClientForm(history));
              }}
            > Créer une fiche client
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item
          name="Archives"
          onClick={(evt) => {
            dispatch(seeArchives(history));
          }}
        />
        <Menu.Item text="Articles" as="div" onClick={showSubMenu}>
          Articles
          <Menu.Menu>
            <Menu.Item
              onClick={(evt) => {
                dispatch(seeProducts(history));
              }}
            > Liste des Articles
            </Menu.Item>
            <Menu.Item
              onClick={(evt) => {
                dispatch(seeArticleForm(history));
              }}
            > Créer un Article
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <AdminMenu admin={sessionStorage.isAdmin} />
      </Menu>
    </div>
  );
};

export default ClassicMenu;
