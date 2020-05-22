import React, { Component, useState } from 'react';
import { Header } from 'semantic-ui-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import 'bootstrap/dist/css/bootstrap.min.css';

import ClientsForm from 'src/components/ClientsForm';


const FormTab = () => {
    return(
        <div className="main">
            <Header as='h2'>
                Créer une fiche SAV 
            </Header>
            <Tabs defaultActiveKey="client" id="uncontrolled-tab-example">
            <Tab eventKey="client" title="Client">
                    <ClientsForm />
                </Tab>
                <Tab eventKey="appareil" title="Appareil" disabled>
                  
                </Tab>
                <Tab eventKey="intervention" title="Intervention" disabled>
                  
                </Tab>
                <Tab eventKey="galerie" title="Galerie" disabled>
                    
                </Tab>
                <Tab eventKey="devis" title="Devis" disabled>
                    
                </Tab>
                <Tab eventKey="options" title="Options" disabled>
                    
                </Tab>
            </Tabs>
        </div>
    );
};

export default FormTab;