// == Import npm
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import momentTz from 'moment-timezone';


//Semantic-ui import
import { Form, Button} from 'semantic-ui-react';

const DevisForm = () => {
  //UseAlert shows an alert window to confirm you completed the form correctly.
  const alert = useAlert()

  let {order_number} = useParams();
    

  const [ devis, setDevis] = useState([]);

  const url = `http://localhost:3000/api/sav/stepfive/${order_number}`;
    const interData = () => {
      axios.get(
        url, {
          withCredentials: true,
          headers:{
              Authorization: sessionStorage.token
          },        
        })
        .then((res) => {
          let date = momentTz.tz(res.data[0].date_devis);
          res.data[0].date_devis = date.format().toString().substring(0, date.format().toString().length - 1);
          setDevis(res.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
  }
  useEffect(interData, [])



  const { register, handleSubmit } = useForm();

  //On submit, the form will be sent to the API and it's data will be save in the API.
  const onSubmit = data => {
    console.log(data);
    const dataform = new FormData();
    dataform.append('devis_is_accepted', data.devis_is_accepted);
    dataform.append('date_devis', data.date_devis);
    dataform.append('amount_devis', data.amount_devis);
    dataform.append('amount_diag', data.amount_diag);
    dataform.append('recall_devis', data.recall_devis);
    dataform.append('order_number_id', devis.id);

    
    //Get data from the Api with an axios request
    axios.patch(`http://localhost:3000/api/sav/stepfive/${order_number}`, dataform,{
      headers: {
        Authorization: sessionStorage.token,
        post: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  .then ((response) => {
    if(response.data){
      alert.success('Validé avec succès')
    }else{
      alert.error('Une erreur s\'est produite.');
    }
  })
  .catch ((error) => {console.trace(error); })

  };

  const diags = [
    {
      value : '15',
      text : '15€ / Petit appareil',
      selected : false 
    },
    {
      value : '25',
      text : '25€ / Plantine vinyle et cd',
      selected : false 
    },
    {
      value : '35',
      text : '35€ / Ampli audio',
      selected : false 
    },
    {
      value : '65',
      text : '65€ / Matériel professionnel',
      selected : false 
    },
    {
      value : '85',
      text : '85€ / Ampli Home cinéma',
      selected : false 
    },
  ];

  const showDiag = () => {
    return diags.map((diag, index) => {
      if(devis.amount_diag == diag.value){
        diag.selected = true
      }
      if(diag.selected){
        return (
          <option key={index} value={diag.value} selected>{diag.text}</option>
        )
      }else{
        return (
        <option key={index} value={diag.value}>{diag.text}</option>
        )
      }
    });
  }


  const isAccepted = [
    {
      name: 'Devis accepté'
    },
    {
      name: 'Devis Refusé'
    },
    {
      name: 'Devis en attente de réponse'
    }
  ];

  const isAcceptedCheckbox = () => {
    return isAccepted.map((accept , index) => {
      if(accept.name == devis.devis_is_accepted){
        return (
        <option key={index} value={accept.name} selected>{accept.name}</option>
        )
      }else{
        return (
          <option key={index} value={accept.name}>{accept.name}</option>
        )
      }
    });
  };


    return (
        <Form
        className="tab-form"
        onSubmit={handleSubmit(onSubmit)}
        >
            <Form.Field>
            <label>Etat du devis</label>
              <select
              ref={register}
              name="devis_is_accepted">
                <option>Sélectionnez l'état du devis</option>
               {isAcceptedCheckbox()}
              </select>
           </Form.Field>
           <Form.Field>
               <label>Date devis</label>
               <input 
                type="datetime-local" 
                placeholder="Saisissez une date" 
                name="date_devis" 
                ref={register}
                defaultValue={devis.date_devis}
               />
           </Form.Field>
           <Form.Field>
               <label>Montant du devis</label>
               <input 
               type="text"
               name="amount_devis"
               min="0"
               ref={register}
               defaultValue={devis.amount_devis}
               />
           </Form.Field>
           <Form.Field>
               <label>Montant du diagnostic</label>
               <select name="amount_diag" ref={register}>
                   <option>Choisissez un montant</option>
                   {showDiag()}              
               </select>
           </Form.Field>
           <Form.Field>
               <label>Nombre de rappels au client pour le devis</label>
               <input 
               type="number"
               name="recall_devis"
               min="0"
               ref={register}
               defaultValue={devis.recall_devis}

               />
           </Form.Field>
           <div className="button-form">
               <Button 
                color='green'
                type='submit'
                >Valider</Button>
               <Button>Annuler</Button>
           </div>
        </Form>
    )
};

export default DevisForm;