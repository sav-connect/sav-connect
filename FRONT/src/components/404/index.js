import React from 'react';

import image from 'src/assets/img/PageNotFound.png'

const Page404 = () => {
  return (
      <div className="page404">
          <p className="page404-title">Désolé, cette page n'existe pas ...</p>
          <img src={image} alt='image 404'/>
      </div>
  );
}

export default Page404;