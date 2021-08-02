import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AllDirigeants from '../Components/Liste/AllDirigeants';
import AllSociety from '../Components/Liste/AllSociety';
import ListeType from '../Components/Liste/ListeType';
import ListeVille from '../Components/Liste/ListeVille';
import PersonIcon from '@material-ui/icons/Person';
import HouseIcon from '@material-ui/icons/House';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const Liste = () => {
  const classes = useStyles();
  const [displayDirigeants, setDisplayDirigeants] = useState(true)
  const [displaySociety, setDisplaySociety] = useState(false)

  const [displaySocieteParType, setDisplaySocieteParType] = useState(true)
  const [displaySocieteparVille, setDisplaySocieteparVille] = useState(false)

  const handleChangeButton1 = () => {
    setDisplayDirigeants(!displayDirigeants);
    setDisplaySociety(!displaySociety);
  }
  const handleChangeButton2 = () => {
    setDisplaySocieteParType(!displaySocieteParType);
    setDisplaySocieteparVille(!displaySocieteparVille);
  }

  const button1 = () => {
    let info = displayDirigeants ? 'voir toutes les sociétés' : 'voir tous les dirigeants'
    return (
      <Button style={{marginTop:50}}  onClick={handleChangeButton1} variant="contained" color="primary" >
       {displayDirigeants ? <HouseIcon style={{ fontSize: 33 }}> </HouseIcon> : <PersonIcon style={{ fontSize: 33 }}> </PersonIcon>}
        {info}
      </Button>
    )
  }

  const button2 = () => {
    let info = displaySocieteParType ? 'filtrer les sociétés selon les villes' : 'filtrer les sociétés selon les types'
    return (
      <Button style={{marginTop:50}}  onClick={handleChangeButton2} variant="contained" color="primary" >
        <SearchIcon style={{ fontSize: 33 }} > </SearchIcon>
        {info}
      </Button>
    )
  }

  return (

    <Layout>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container component="main" className={classes.root} spacing={4}>
            <Grid item xs={12} sm={12} md={8} >
              <div>
                <div align="center">
                  {button1()}
                </div>
                {displayDirigeants && <AllDirigeants />}
                {displaySociety && <AllSociety />}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <div>
                <div align="center">
                {button2()}
                </div>
                {displaySocieteParType && <ListeType />}
                {displaySocieteparVille && <ListeVille/>}
              </div>
            </Grid>
          </Grid>

        </div>
      </Container>
    </Layout>
  )
}

export default Liste
