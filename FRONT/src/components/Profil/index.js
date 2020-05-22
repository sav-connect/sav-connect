import React from 'react';
import { Header, Button, Form, Input } from 'semantic-ui-react';


//Component that represents the Profil page based on '/profil'
const ProfilePage = () => {

  return (
    <div className="main">
      <div className="profil">
        <Header 
          as='h2'>
          Paramètres du compte
        </Header>
        <Form className="profil-form">
          <Form.Field>
            <label>Nom d'utilisateur</label>
            <input/>
          </Form.Field>
          <Form.Field>
            <label>Adresse e-mail</label>
            <input/>
          </Form.Field>
          <Form.Field>
            <label>Mot de passe</label>
            <input/>
          </Form.Field>
          <Form.Field>
            <label>Nouveau mot de passe</label>
            <input/>
          </Form.Field>
          <Form.Field>
            <label>Confirmez le nouveau mot de passe</label>
            <input/>
          </Form.Field>
            <div className="button-field-profil">
              <Button
              type='submit'
              color="green"
              className="submit-button">Enregistrer
              </Button>
              <Button
              color="red"
              >Déconnexion</Button>
            </div>
        </Form>
      </div>
    </div>
  );     
};

export default ProfilePage;
