import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CardWrapper = styled.div`
    max-width: 100%;
    color: #8E8E8E;
    background: rgb(252,251,255);
    background: linear-gradient(177deg, rgba(252,251,255,1) 0%, rgba(255,255,255,1) 100%);
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 220px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5em;
    text-align: center;
    min-height: 0;
    margin: 1rem .5rem;
    background: #fff;
    padding: 1rem;
    border: none;
    border-radius: 25px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.05);
    transition: .3s;
    :hover {
      transform: translateY(-10px);
      transition-timing-function: ease-out;
      box-shadow: 0 7px 13px rgba(0,0,0,.2);
      transition: .3s;
    }
`;

const MuseumCity = styled.p`
  font-size: .6em;
  font-weight: 900;
  text-transform: lowercase;;
  color: #8e8e8e5c;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const MuseumTitle = styled.p`
  color: #000
`;

const Card = ({ nom_du_musee, ville, id }) => (
  <Link to={`/museum/${id}`}>
    <CardWrapper>
      <MuseumTitle data-jest='card-title'>{nom_du_musee}</MuseumTitle>
      <MuseumCity data-jest='card-city'>{ville}</MuseumCity>
    </CardWrapper>
  </Link>
);

Card.propTypes = {
  nom_du_musee: PropTypes.string.isRequired,
  ville: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Card;
