import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Phone, MousePointer } from 'react-feather';

import Loader from '../Loader';
import StyledListMuseum from '../StyledListMuseum';
import StyledSubtitle from '../StyledSubtitle';
import Error from '../Error';
import Maps from '../Maps';
import ban from './ban1.png';

const Adress = styled.div`
  text-align: center;
`;

const StyledFullDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 6rem;
`;

const Text = styled.p`
  color: #8E8E8E;
`;

const TextFull = styled.p`
  width: 50%;
  margin: 0 auto;
  color: #8E8E8E;
`;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  margin-bottom: 6rem;
`;

const LineWrapper = styled.div`
  width: 70%;
  margin: 2rem auto;
`;

const StyledBold = styled.div`
  font-weight: bold;
  margin: 0 auto;
  color: #8E8E8E;
  width: 100%;
  text-align: center;
`;

const StyledTitleImg = styled.h1`
  background-size: contain;
  background:url(${ban});
  width: 80%;
  font-size: 2.6em;
  text-align: center;
  margin: 2rem 0 3rem;
  color: #FFF;
  font-weight: 900; 
  height: 100px;
  text-align: left;
  line-height: 1.4;
  padding-left: 1.4rem;
  span {
    color: #d4d3d4;
    display: block;
    font-size: 1.4rem;
    text-transform: lowercase;;
    ::first-letter {
      text-transform: uppercase;
    }
  }
`;

const MuseumDetails = () => {
  const [museum, setMuseum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/records/${id}`)
    .then(response => {
      setMuseum(response.data.record.fields);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
    });
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/frequentation-des-musees-de-france/records?search=${museum.nom_du_musee}`)
    .then(response => {
      setAttendance(response.data.records);
      setLoadingAttendance(false);
    })
    .catch((error) => {
      setError(error);
    });
  }, [id, museum.nom_du_musee]);

  const attendanceArr = attendance.map((year) => {
    return {
      date: year.record.fields.annee,
      total: year.record.fields.total
    }
  }).sort(function(a, b){
    return a.date - b.date;
  });

  // Je supprime de mon tableau, les retours de l'API avec des valeurs de total à null
  const attendanceFiltered = attendanceArr.filter(item => item.total !== null);

  const data = {
    labels: attendanceFiltered.map(item => item.date),
    datasets: [
      {
        label: 'Evolution de la fréquentation',
        fill: false,
        lineTension: 0.1,
        borderColor: '#2E2E7A',
        pointBackgroundColor: '#2E2E7A',
        pointHoverBackgroundColor: '#2E2E7A',
        data: attendanceFiltered.map(item => item.total),
      }
    ]
  };
  if(error) {
    return <> 
      <Error error={error}/> 
    </>
  }
  return (
    <>
      <Link to="/">Retour</Link>
      {loading &&
      <Loader />}
      {!loading &&
      <StyledListMuseum>
        <StyledTitleImg>{museum.nom_du_musee} <span>{museum.ville}</span> </StyledTitleImg>
        <StyledFullDiv>
        <StyledSubtitle> <Calendar /> Quand y aller ?</StyledSubtitle>
          <TextFull>{museum.periode_ouverture ? museum.periode_ouverture : 'Information indisponible'}</TextFull>
        </StyledFullDiv>
        <StyledDiv>
          <div>
            <StyledSubtitle><Phone />Comment les joindres ?</StyledSubtitle>
            <Text>Tel: {museum.telephone1 ? museum.telephone1 : 'non renseigné'}</Text>
            <Text>Fax: {museum.fax ? museum.fax : 'non renseigné'}</Text>
          </div>
          <Adress>
            <StyledSubtitle><MapPin /> Où les trouver ?</StyledSubtitle>
            <Text>{museum.adr}</Text>
            <Text>{museum.ville}</Text>
            <Text>{museum.departement}</Text>
            <Text>{museum.region}</Text>
          </Adress>
        </StyledDiv>
        <StyledFullDiv>
          <StyledSubtitle><MousePointer /> Site web</StyledSubtitle>
          <TextFull>{museum.sitweb}</TextFull>
        </StyledFullDiv>
        {museum.fermeture_annuelle &&
        <StyledBold>
          <Text><span>nb:</span> Ils sont fermés le {museum.fermeture_annuelle}</Text>
        </StyledBold>}
        {museum.coordonnees_finales &&
          <Maps {...museum.coordonnees_finales} />}
      </StyledListMuseum>}
      {loadingAttendance &&
      <Loader />}
      {!loadingAttendance &&
      <LineWrapper>
      <StyledSubtitle>
        Evolution de la fréquentation 
      </StyledSubtitle>
        <Line data={data} />
      </LineWrapper>}
    </>
  );
}

export default MuseumDetails;

// @TODO : btn retour