import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NBR_MUSEUMS_PER_PAGE } from '../constants/museum';

const MuseumList = () => {
  const [listMuseums, setListMuseums] = useState([]);
  const [nbrMuseums, setNbrMuseums] = useState(0);
  const [start, setStart] = useState(0);
  const [nbrPages, setNbrPages] = useState(0);
  const [ville, setVille] = useState('PARIS');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=(ville:${ville})&facet=ville&start=${start}`
      );
      const data = await response.json();
      const museums = data?.records ?? [];
      const count = data?.nhits ?? 0;
      setNbrMuseums(count);
      setNbrPages(Math.floor(count / NBR_MUSEUMS_PER_PAGE));
      setListMuseums(museums);
    };

    fetchData();
  }, [start, ville]);

  const ListContainer = styled.div`
    display: flex;
    border-radius: 1.8rem;
    background-color: #522C7B;
    height: 100vh
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  `;

  const PaginationBox = styled.div`
    margin-top: 2rem;
    border-radius: 1.8rem;
    background-color: #2c7b79;
    color: white;
    padding: 1.2rem;
    font-size: 1.8rem;
  `;

  const PageLink = styled.a`
    color: #2c2e7b;
    margin: 1rem;
  `;

  const NameBlock = styled.span`
    font-size: 1.2rem;
    color: white;
    margin: 0.8rem;
  `;

  const paginationIncrement = (e) => {
    e.preventDefault();
    setStart(start + NBR_MUSEUMS_PER_PAGE);
  };

  const paginationDecrement = (e) => {
    e.preventDefault();
    setStart(start - NBR_MUSEUMS_PER_PAGE);
  };

  return (
    <ListContainer>
      {listMuseums.map((museum) => (
        <NameBlock key={museum.recordid}>{museum?.fields?.nom_du_musee ?? ''}</NameBlock>
      ))}

      <PaginationBox>
        {start >= NBR_MUSEUMS_PER_PAGE && (
          <PageLink href="#" onClick={paginationDecrement}>
            Précedent
          </PageLink>
        )}
        {Math.floor(start / NBR_MUSEUMS_PER_PAGE) + 1} / {nbrPages}
        {start + NBR_MUSEUMS_PER_PAGE < nbrMuseums && (
          <PageLink href="#" onClick={paginationIncrement}>
            Suivant
          </PageLink>
        )}
      </PaginationBox>
    </ListContainer>
  );
};

export default MuseumList;
