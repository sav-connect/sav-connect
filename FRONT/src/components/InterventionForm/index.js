 // == Import npm
 import React, {useState, useEffect} from 'react';
 import { useForm } from 'react-hook-form';
 import { useParams } from 'react-router-dom';
 import axios from 'axios';
 import { useAlert } from 'react-alert';
 import momentTz from 'moment-timezone';

 
 //Semantic-ui import
 import { Form, Button } from 'semantic-ui-react';

 const InterventionForm = () => {
  //UseAlert shows an alert window to confirm you completed the form correctly.
  const alert = useAlert()

  //React hook form props
  const { register, handleSubmit } = useForm();

  let {order_number} = useParams();

  const [ interOne, setInter] = useState([]);

    const url = `http://localhost:3000/api/sav/stepthree/${order_number}`;
      const interData = () => {
        axios.get(
          url, {
            withCredentials: true,
            headers:{
                Authorization: sessionStorage.token
            },        
          })
          .then((res) => {
            let date = momentTz.tz(res.data[0].date_intervention);
            res.data[0].date_intervention = date.format().toString().substring(0, date.format().toString().length - 1);
            setInter(res.data[0])
          })
          .catch((err) => {
            console.log(err)
          })
    }
    useEffect(interData, [])

  //On submit, the form will be sent to the API and it's data will be save in the API.
  const onSubmit = data => {
    const dataform = new FormData();
    dataform.append('order_number_id', interOne.id);
    dataform.append('intervention', data.intervention);
    dataform.append('date_intervention', data.date_intervention);
   
    console.log(Array.from(dataform));

    //Get data from the Api with an axios request
    axios.patch(`http://localhost:3000/api/sav/stepthree/${order_number}`, dataform,{
      headers: {
        Authorization: sessionStorage.token,
        post: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  .then ((response) => {
    if(response.data){
      alert.success('La fiche a bien été modifié')
    }else{
      alert.error('Une erreur s\'est produite.')
    }
  })
  .catch ((error) => {console.trace(error); })

  };
    return (
        <Form
        className="tab-form"
        onSubmit={handleSubmit(onSubmit)}
        >
            <Form.Field>
                <label>Descriptif de l'intervention</label>
                <textarea 
                    placeholder='Intervention' 
                    style={{ minHeight: 100 }}
                    name="intervention"
                    defaultValue={interOne.intervention}
                    ref={register}
                />
            </Form.Field>
            <Form.Field>
                <label>Date d'intervention</label>
                <input 
                 type="datetime-local" 
                 placeholder="Saisissez une date" 
                 name="date_intervention"
                 defaultValue={interOne.date_intervention}
                 ref={register} 
                 />
            </Form.Field>
            <div className="button-form">
                <Button 
                 color='green'
                 type='submit'
                 >Valider</Button>
                <Button type='submit'>Annuler</Button>
            </div>
        </Form>
    )
 };

 export default InterventionForm;