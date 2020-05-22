 // == Import npm
 import React, {useState, useEffect} from 'react';
 import { useDispatch } from 'react-redux';
 import { useForm } from 'react-hook-form';
 import { useParams } from 'react-router-dom';
 import axios from 'axios';
 import { useAlert } from 'react-alert';
 //Import action from store:
 import { syncText } from 'src/store/actions';
 //Semantic-ui import

 import { Form, Button, Checkbox } from 'semantic-ui-react';
 import momentTz from 'moment-timezone';



 const InterventionForm = (props) => {
   const dispatch = useDispatch();
  //React hook form props
  const { register, handleSubmit, reset, } = useForm();
  //UseAlert shows an alert window to confirm you completed the form correctly.
  const alert = useAlert()

  let {order_number} = useParams();

  const [ deviceOne, setDevice] = useState([]);

    const url = `http://localhost:3000/api/sav/steptwo/${order_number}`;
      const deviceData = () => {
        axios.get(
          url, {
            withCredentials: true,
            headers:{
                Authorization: sessionStorage.token
            },        
          })
          .then((res) => {
            let date = momentTz.tz(res.data[0].interval_repair);
            res.data[0].interval_repair = date.format().toString().substring(0, date.format().toString().length - 1);
            setDevice(res.data[0]);
          })
          .catch((err) => {
            console.log(err)
          })
    }
    useEffect(deviceData, [])

  //On submit, the form will be sent to the API and it's data will be save in the API.
  const onSubmit = data => {
    const dataform = new FormData();
    dataform.append('order_number', data.order_number);
    dataform.append('device_brand', data.device_brand);
    dataform.append('interval_repair', data.interval_repair);
    dataform.append('panne', data.panne);
    dataform.append('config_pannes', data.config_pannes);
    dataform.append('order_number_id', deviceOne.id);

    //Get data from the Api with an axios request
    axios.patch(`http://localhost:3000/api/sav/steptwo/${order_number}`, dataform,{
      headers: {
        Authorization: sessionStorage.token,
        post: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  .then ((response) => {
    if(response.data){
      alert.success('La fiche a bien été modifiée')
    }else{
      alert.error('Une erreur s\'est produite.')
    }
      // console.log(response)
  })
  .catch ((error) => {console.trace(error); })

  };

  

    return (
        <Form
        className="tab-form"
        onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
                <label>Modèle de l'appareil</label>
                <input 
                 type="text"  
                 name="device_brand" 
                 defaultValue={deviceOne.device_brand}
                 ref={register}
                  
                 />
            </Form.Field>
            <Form.Field>
                <label>Descriptif de la panne</label>
                <Panne />
                <textarea 
                    id="example-fade-text"
                    placeholder="Descriptif panne"
                    style={{ minHeight: 100 }}
                    name="panne"
                    // onChange={(evt) => {
                    //   dispatch(syncText(evt.target.value));
                    // }}
                    // defaultValue={deviceOne.panne}
                    ref={register}
                    />
            </Form.Field>
            <Form.Field>
                <label>Délai de réparation</label>
                <input 
                 type="datetime-local" 
                 placeholder="Saisissez une date" 
                 name="interval_repair"
                 defaultValue={deviceOne.interval_repair}
                 ref={register} 
                 />
            </Form.Field>
            <div className="button-form">
                <Button 
                 color='green'
                 type='submit'
                 onClick={reset}
                 >Valider</Button>
                <Button type='submit'>Annuler</Button>
            </div>
        </Form>
    )
 };


 const copyCheckbox = (event) => {
    event.preventDefault();
    const label = event.target;
    const value = label.textContent
    console.log(value)
    const textarea = document.getElementById('example-fade-text');
    let contentTextArea = textarea.textContent;
    contentTextArea += ' '+ value + ' / ';
    textarea.defaultValue = contentTextArea;
    
}

 //Breakdowns checkbox List
 const Panne = () => { 
  // const dispatch = useDispatch();
  // const results = useSelector((state) => state.results);
  const [ configPannes, setConfigPannes ] = useState([]);

     const getBreaks = async () => {
      let breakData = await axios.get('http://localhost:3000/api/config-panne', {
          withCredentials: true,
              headers: {
              Authorization: sessionStorage.token
              },
      });
      setConfigPannes(breakData.data);
  };
  getBreaks();

  const handleChecked = () => {
    console.log('checked')
  };


 

  const liList = () => {
      return configPannes.map((panne) => {
        
          return (
            <Checkbox
             key={panne.id}
             onChange={copyCheckbox}
             label={panne.title}
             value={panne.title}
            //  checked={handleChecked()}
            />
              // <div className="ui labeled button"
              //  key={panne.id}
              //  onClick={copyDiv}
              //  >
              //    {/* <div className="ui button"></div> */}
              //    <div className="ui basic label">{panne.title}</div>
              // </div>
          );
      });
  }
  return (
      <>
          {liList()}
      </>
  
  );
  
  };

 export default InterventionForm;