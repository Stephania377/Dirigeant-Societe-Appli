import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  texte: {
    width: "100%",
    margin: theme.spacing(5, 0, 1, 0),
    textAlign: "center",
},
}));

export default function ListeVille() {
  const classes = useStyles();

  const [accordion, setAccordion] = useState([])

  useEffect(() => {
    var config = {
      method: 'get',
      url: '/api/get-society-via-ville',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        if (response.data) {
          setAccordion(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h5" className={classes.texte}>
      Nombre de société en fonction de ses Villes et Codes Postals
      </Typography>

      {
        accordion && accordion.map(ville => {
           return <Accordion>
            <AccordionSummary
              aria-controls={`panel${ville.id}a-content`}
              id={`panel${ville.id}a-header`}
            >
              <Typography>{ville.nom} ({ville.societes.length} societe) | codepostal : {ville.codePostal.code} </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {
                  ville.societes.map(societe => {
                    return <li>{societe.nom}</li>
                  })

                }
              </ul>
            </AccordionDetails>
          </Accordion>
        })
      }
    </div>
  );
}
