import React, {useState, useEffect} from 'react';
import { Header, Button, Form } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';



import DeviceForm from 'src/components/DeviceForm';
import InterventionForm from 'src/components/InterventionForm';
import DevisForm from 'src/components/DevisForm';
import OptionsForm from 'src/components/OptionsForm';
import ClientTab from 'src/components/ClientTab';
import GalleryForm from 'src/components/GalleryForm';
import Activity from '../Activity';

//Import store actions
import { seeArchives } from 'src/store/actions';

const NewFormTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();
    //Get Client Informations:
    let order_number;

    if(sessionStorage.order_number){
        order_number = sessionStorage.order_number;
        delete sessionStorage.order_number;
    }else{
        order_number = useParams();
        order_number = order_number.order_number
    }
    const [ clientOne, setClient] = useState([]);
    const url = `http://localhost:3000/api/sav/stepone/${order_number}`;
      const clientData = () => {
        axios.get(
          url, {
            withCredentials: true,
            headers:{
                Authorization: sessionStorage.token
            },        
          })
          .then((res) => {
            setClient(res.data[0]);
          })
          .catch((err) => {
            console.log(err)
          })
    }
    useEffect(clientData, [])

    /**
     * Archiver la fiche
     */
    const archiveSav = () => {
        if(window.confirm('Voulez-vous archiver cette fiche ?')){
          const urlArchive = `http://localhost:3000/api/sav/archive/${clientOne.id}`;
          axios.get(
            urlArchive, {
              withCredentials: true,
              headers:{
                  Authorization: sessionStorage.token
              },        
            })
            .then((res) => {
              if(res.data){
                dispatch(seeArchives(history))
              //  alert.success('Fiche SAV archivée avec succès.')
                
              }else{
                alert.error('Impossible d\'archiver la fiche.');
              }
            })
            .catch((err) => {
              console.log(err)
            })
          }
      }
  

    return (
        <>
        <div className="main">
            <div className="head-newformtab">
                <Header as='h2'>
                    Fiche {clientOne.order_number}
                    <i className="trash alternate icon" onClick={archiveSav} style={{fontSize:'1.3em'}}/>
                </Header>
                
                {/* <Button onClick={archiveSav}>Archiver la fiche</Button> */}
            </div>
            <Tabs defaultActiveKey="client" className="active" id="uncontrolled-tab-example">
            <Tab eventKey="client" title="Client">
                    <ClientTab/>
                </Tab>
                <Tab eventKey="appareil" title="Appareil">
                    <DeviceForm />
                </Tab>
                <Tab eventKey="intervention" title="Intervention">
                    <InterventionForm />
                </Tab>
                <Tab eventKey="galerie" title="Galerie" >
                    <GalleryForm />
                </Tab>
                <Tab eventKey="devis" title="Devis" >
                    <DevisForm />
                </Tab>
                <Tab eventKey="options" title="Options" >
                    <OptionsForm />
                </Tab>
            </Tabs>
        </div>
        {/* <Activity type="sav" /> */}
        </>
    );
};

export default NewFormTab;