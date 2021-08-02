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

export default function ListeType() {
  const classes = useStyles();

  const [accordion, setAccordion] = useState([])

  useEffect(() => {
    var config = {
      method: 'get',
      url: '/api/typeAndSociete',
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
      Nombres de sociétés selon ses types
      </Typography>
      {
        accordion && accordion.map(typeSociete => {
           return <Accordion>
            <AccordionSummary
              aria-controls={`panel${typeSociete.id}a-content`}
              id={`panel${typeSociete.id}a-header`}
            >
              <Typography className={classes.heading}>{typeSociete.nom} {typeSociete.societe.length} societe</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {
                  typeSociete.societe.map(societe => {
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
