import React from 'react';
import SelectSearch from 'react-select-search';


const SelectSearchCustom = (props) => (
    <SelectSearch
        {...props}
        getOptions={(query) => {
          return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/search/user/?q=${query}`, {
                withCredentials: true,
                headers: {
                  Authorization: sessionStorage.token,
                },
              })
          
            .then((response) => {
                resolve(console.log(response.data.map((client, key) => ({value: client.id.toString(), name: client.lastname + ' ' + client.firstname}))))
                
            })
            // .then((result) => {
            //   resolve(result.map((client, key) => ({value: client.id.toString(), name: client.lastname + ' ' + client.firstname})))
                
              
            // }) 
            .catch((error) => {
                  reject(error)
            });
          });
          console.log(clientSearch(query) )
        }
      }
      />
  );

  export default SelectSearchCustom;