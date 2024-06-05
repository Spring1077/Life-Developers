import React from 'react';

const Contenido = () => {
  return (
    <div>
      <div className="cta-container">
        <button className="cta-button">SEE OUR 2024 REPORT</button>
      </div>
      <div className="content-below-header">
        <div className="background-image-container">
          <img
            src="/back.jpg"
            alt="Descripción de la imagen"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="blurred-container"></div>
        <span className="first-line">State of Smart <br />Manufacturing</span>
        <span className="second-line">
          Explore the latest trends and best practices to help <br /> stay competitive, increase agility, and unlock long-term <br /> opportunities
        </span>
      </div>
    </div>
  );
};

export default Contenido;
