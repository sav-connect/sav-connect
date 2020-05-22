// == Import npm
import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'

// == Composant
const WorkerMenu = () => {

    return (
      <div className="navbar">
        <Grid>
          <Grid.Column>
              <Menu fluid vertical tabular>
                <Menu.Item
                  name='Liste des réparations'
                />
                <Menu.Item
                  name='Liste des clients'
                />
                <Menu.Item
                  name='Archives'
                />
                <Menu.Item
                  name='Articles'
                />
              </Menu>
            </Grid.Column>
        </Grid>
      </div>
    )
}; 

export default WorkerMenu;
