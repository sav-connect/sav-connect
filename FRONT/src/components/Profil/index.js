import React, { Component } from 'react';
import { Header, Button, Form, Input } from 'semantic-ui-react';
import axios from 'axios';


//Component that represents the Profil page based on '/profil'
class ProfilePage extends Component {

  state = {
    profil: {
      lastname: '',
      fistname: '',
      mail: '',
      password: '',
      newPassword: '',
      newPassword_two: ''
    }
  }

  constructor(props) {
    super(props);
    this.getProfile();
  }

  getProfile = () => {
    axios.get('http://localhost:3000/api/user/profil',{
      headers: {
        Authorization: sessionStorage.token
      }
      })
    .then ((response) => {
      if(response){
        const state = this.state;
        state.profil = {
          ...state.profil,
          lastname: response.data.lastname,
          fistname: response.data.firstname,
          mail: response.data.mail
        }
        this.setState(state);
      }
    })
    .catch ((error) => {console.trace(error); });
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    const state = this.state;
    state.profil[name] = value;
    this.setState(state);
  }

  handleSubmit = event => {

    const dataform = new FormData();
    dataform.append('firstname', this.state.profil.fistname);
    dataform.append('lastname', this.state.profil.lastname);
    dataform.append('mail', this.state.profil.mail);
    dataform.append('password', this.state.profil.password);
    dataform.append('newPassword', this.state.profil.newPassword);

axios.patch('http://localhost:3000/api/user/profil', dataform,{
      headers: {
        Authorization: sessionStorage.token,
        post: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  .then ((response) => {
      console.log(response.data);
  })
  .catch ((error) => {console.trace(error); })

//   };
  }

  render =() => {
    return (
      <div className="main">
        <div className="profil">
          <Header 
            as='h2'>
            Paramètres du compte
          </Header>
          <Form className="profil-form"
            onSubmit={this.handleSubmit}  
          >
            <Form.Field>
              <label>Nom</label>
              <input 
              type="text"
              name="lastname"
              value={this.state.profil.lastname}
              onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Prénom</label>
              <input 
              type="text"
              name="fistname"
              value={this.state.profil.fistname}
              onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Adresse e-mail</label>
              <input
                type="email"
                name="mail"
                value={this.state.profil.mail}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={this.state.profil.password}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                value={this.state.profil.newPassword}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirmez le nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword_two"
                value={this.state.profil.newPassword_two}
                onChange={this.handleChange}
              />
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

  }
};

export default ProfilePage;



