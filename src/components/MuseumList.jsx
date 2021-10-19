import React, { useState, useEffect } from 'react';
import { NBR_MUSEUMS_PER_PAGE } from '../constants/museum';

const MuseumList = () => {
  const [listMuseums, setListMuseums] = useState([]);
  const [start, setStart] = useState(0);
  const [nbrPages, setNbrPages] = useState(0);

  useEffect(async () => {
    const response = await fetch(
      `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=&facet=region&facet=departement&start=${start}`
    );
    const data = await response.json();
    const museums = data?.records ?? [];
    const nbrMuseums = data?.nhits ?? 0;
    setNbrPages(Math.floor(nbrMuseums / NBR_MUSEUMS_PER_PAGE));
    setListMuseums(museums);
  }, [start]);

  return (
    <div>
      {listMuseums.map((museum) => (
        <p>Nom : {museum?.fields?.nom_du_musee}</p>
      ))}

      <div>
        {start} / {nbrPages}
      </div>
    </div>
  );
};

export default MuseumList;
