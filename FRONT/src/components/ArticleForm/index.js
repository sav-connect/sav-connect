// == Import npm
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//Semantic-ui import
import { Header, Form, Button } from 'semantic-ui-react';

//Import store actions
import { seeProducts } from 'src/store/actions';

class ArticleForm extends Component {
  state = { 
    product : {
      ref: '',
      name: '',
      price: ''
    },
    redirect : false,
    error: null
  }

  constructor(props) {
    super(props);
  }


  handleChange = event => {
    const values = event.target.value;
    const name = event.target.name;
    const state = this.state;
    state.product[name] = values;
    this.setState(state);
  }

  handleSubmit = event => {
    const dataform = new FormData();
        dataform.append('ref', this.state.product.ref);
        dataform.append('name', this.state.product.name);
        dataform.append('price', this.state.product.price);
        dataform.append('mesure', '€');
        //Get data from the Api with an axios request
        axios.post('http://localhost:3000/api/product/add', dataform,{
          headers: {
            Authorization: sessionStorage.token,
            post: {
              'Content-Type': 'multipart/form-data'
            }
          }
        })
      .then ((response) => {
        console.log(response.data);
        if(response.data){
          if(response.data.error){
            this.setState({error: response.data.error});
          }else{
            this.setState({redirect: true});
          }
        }else{
          this.setState({error: response.data.error});
        }
      })
      .catch ((error) => {console.trace(error); })
  }

  showError = () => {
    if(this.state.error) {
      return (
      <div style={{color: 'white', backgroundColor:'#e74c3c', borderRadius:'5px', padding:'5px', width:'100%'}}>{this.state.error}</div>
      )
    }
  }

  render() { 
    const { redirect } = this.state;
    if(redirect){
      return <Redirect to='/articlelist/1' />
    }
    return ( 
      <div className="main">
      <Header as='h2'>
         Nouvel article
       </Header>
       {this.showError()}
       {/* This is the main of all the page */}
       <div className="newcard">
       <Form 
       onSubmit={this.handleSubmit}
        >
        {/* This section is for the article's informations */}
        <div className="newcard-client">
          <Form.Field>
            <label>Référence</label>
            <input 
              name="ref"
              onChange={this.handleChange}
              value={this.state.product.ref}
            />
          </Form.Field>
          <Form.Field>
            <label>Désignation</label>
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.product.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Prix</label>
            <input 
              name="price"
              type="number"
              onChange={this.handleChange}
              value={this.state.product.price}
            />
          </Form.Field>
        </div>
        <div className="newcard-button-form">
          <Button 
           color='green'
           type='submit'
           >Valider</Button>
           <Link to={`/dashboard/1`}>
            <Button type='submit'>Annuler</Button>
           </Link>
        </div>
      </Form>
      </div>
    </div>

    );
  }
}
 
export default ArticleForm;


// // A Form to create and register a new SAV card
// const ArticleForm = () => {
//   //Usedispatch is to "dispatch" the route on where we want to go onSubmit
//   const dispatch = useDispatch();
//   const history = useHistory();

//   //UseAlert shows an alert button to confirm you completed the form correctly.
//   const alert = useAlert()

//   //React hook form props
//   const { register, handleSubmit } = useForm();

//   //On submit, the form will be sent to the API and it's data will be save in the API.
//   const onSubmit = data => {
//     const dataform = new FormData();
//     dataform.append('ref', data.ref);
//     dataform.append('name', data.name);
//     dataform.append('price', data.price);
//     dataform.append('created_at', data.created_at);
//     dataform.append('updated_at', data.updated_at);

//     console.log(Array.from(dataform));
//     //Get data from the Api with an axios request
//     axios.post('http://localhost:3000/api/product/add', dataform,{
//       headers: {
//         Authorization: sessionStorage.token,
//         post: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     })
//   .then ((response) => {
//     dispatch(seeProducts(history));
//     if(response.data){
//       alert.success('Article crée')
//     }else{
//       alert.error('Une erreur s\'est produite.');
//     }
//   })
//   .catch ((error) => {console.trace(error); })

//   };

//   return (
//     <div className="main">
//       <Header as='h2'>
//         Nouvel article
//       </Header>
//       {/* This is the main of all the page */}
//       <div className="newcard">
//       <Form onSubmit={handleSubmit(onSubmit)}
//       >
//         {/* This section is for the article's informations */}
//         <div className="newcard-client">
//           <Form.Field>
//             <label>Référence</label>
//             <input name="ref" ref={register}/>
//           </Form.Field>
//           <Form.Field>
//             <label>Nom</label>
//             <input name="name" ref={register}/>
//           </Form.Field>
//           <Form.Field>
//             <label>Prix</label>
//             <input name="price" ref={register} />
//           </Form.Field>
//         </div>
//         <div className="newcard-button-form">
//           <Button 
//            color='green'
//            type='submit'
//            >Valider</Button>
//            <Link to={`/dashboard/1`}>
//             <Button type='submit'>Annuler</Button>
//            </Link>
//         </div>
//       </Form>
//       </div>
//     </div>
//   );
// };

// export default ArticleForm;
