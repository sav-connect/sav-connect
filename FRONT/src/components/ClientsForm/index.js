// == Import npm
import React, {useState} from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';

//Semantic-ui import
import { Header, Form, TextArea, Button } from 'semantic-ui-react';

//Import store actions
import { seeNewCardForm } from 'src/store/actions';

// A Form to create and register a new client
const ClientsForm = () => {

  //UseAlert shows an alert window to confirm you completed the form correctly.
  const alert = useAlert()


  const [ alertSuccess, setAlertSuccess] = useState(false);

  //Usedispatch is to "dispatch" the route on where we want to go onSubmit
  const dispatch = useDispatch();
  const history = useHistory();

  //React hook form props
  const { register, handleSubmit, errors } = useForm();

  //On submit, the form will be sent to the API and it's data will be save in the API.
  const onSubmit = data => {
    const idCustomer = changeHidden();
    const dataform = new FormData();
    dataform.append('firstname', data.firstname);
    dataform.append('lastname', data.lastname);
    dataform.append('mail', data.mail);
    dataform.append('phone', data.phone);
    dataform.append('phone_two', data.phone_two);
    dataform.append('customer_detail', data.customer_detail);
    dataform.append('customer_id', idCustomer);
    dataform.append('device_name', data.device_name);
    
    console.log(Array.from(dataform));
    //Get data from the Api with an axios request
    axios.post('http://localhost:3000/api/sav/stepone', dataform,{
      headers: {
        Authorization: sessionStorage.token,
        post: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    })
  .then ((response) => {
    console.log(response.data.order_number.order_number)
    if(response.data.order_number.order_number){
      sessionStorage.setItem('order_number', response.data.order_number.order_number);
        // dispatch(seeNewCardForm(history))
      console.log(sessionStorage)
      setAlertSuccess(true);
    }else{
      console.log("une erreur s'est produite")
    }
   
  })
  .catch ((error) => {console.trace(error); })

  };

  const changeHidden = () => {
    return document.querySelector('#selectCustomer').value;
  }
 
  const showEditCard = () => {
    console.log(alertSuccess);
    if(alertSuccess){
      // setAlertSuccess(false);
      return (
        <div className="alert alert-success" role="alert">
             Votre fiche a bien été créé, cliquez ici pour l'éditer : <Link to={`/newformtab/${sessionStorage.order_number}`} className="alert-link">Fiche SAV : {sessionStorage.order_number}</Link>
        </div>
      )
    }
  }

  

  return (
      <Form
      onSubmit={handleSubmit(onSubmit)}
      >
        {showEditCard()}
        <Header className='first-client-form-header' as='h4'>Sélectionnez un client</Header>
          <Form.Field>
            <ClientList />
            <input type="hidden" name="customer_id" id="customer_id" />
          </Form.Field>
        <Header className='second-client-form-header'as='h4'>Ou créez un nouveau client</Header>
        <Form.Field>
          <label>Prénom</label>
          <input 
          name="firstname" 
          ref={register}
          />
        </Form.Field>
        <Form.Field>
          <label>Nom *</label>
          <input
          name="lastname" 
          ref={register({ required: "Veuillez renseigner ce champ"})}
          />
        </Form.Field>
        <Form.Field>
          <label>Téléphone *</label>
          <input 
           name="phone" 
           ref={register({ required: "Veuillez renseigner ce champ"})}
           />
        </Form.Field>
        <Form.Field>
          <label>Téléphone 2</label>
          <input 
          placeholder='Optionnel'
          name="phone_two" 
          ref={register}
          />
        </Form.Field>
        <Form.Field>
          <label>Adresse e-mail</label>
          <input 
           name="mail" 
           ref={register}
          />
        </Form.Field>
        <Form.Field>
              <label>Nom de l'appareil à réparer *</label>
              <input 
              name="device_name"
              ref={register({ required: "Veuillez renseigner ce champ"})}
              />
              <ErrorMessage errors={ errors } name="device_name" />
          </Form.Field>
          <Form.Field>
          <label>Notes</label>
          <TextArea 
          placeholder='Informations supplémentaires' 
          style={{ minHeight: 100 }}
          name="customer_detail" 
          ref={register}
          />
        </Form.Field>
        <div className="button-form">
          {/* <Link to={`/newformtab/`}> */}
          <Button 
           color='green'
           type='submit'
           >Valider</Button>
            {/* </Link> */}
          <Link to={`/dashboard/1`}>
            <Button type='submit'>Annuler</Button>
          </Link>

        </div>
          {showEditCard()}
      </Form>
  );
};

//Get Client List for Select:
const ClientList = () => {
    const { register } = useForm();

    const [ configCustomers, setConfigCustomers ] = useState([]);
       const getClients = async () => {
        let clientsData = await axios.get('http://localhost:3000/api/client', {
            withCredentials: true,
                headers: {
                Authorization: sessionStorage.token
                },
        });
        setConfigCustomers(clientsData.data);
    };
    getClients();

    
    const showClients = () => {
        return configCustomers.map((customer) => {
            return (
                
                    <option 
                    key={customer.id}
                    value={customer.id}
                    >{customer.lastname} {customer.firstname}
                    </option>
                    
                
            );
        });
    }
    return (
        <select
            ref={register}
            id="selectCustomer"
            name="select"
            >
                <option> 
                    Choisissez un client 
                    </option>
            {showClients()}
        </select>
        
        
    );
    
};
   

export default ClientsForm;