import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import Erreur from '../../Utils/Alert/Erreur';
import Success from '../../Utils/Alert/Success';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  homme: {
    margin: theme.spacing(0, 0, 0, 9),
    color: "rgb(50,50,50)",
  },
  radio: {
    margin: theme.spacing(1, 0, 0, 1.7),
  }
}));

const FormDirigeant = () => {
  const classes = useStyles();
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [genre, setGenre] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    var data = JSON.stringify({
      "nom": nom,
      "prenom": prenom,
      "genre": genre,
      "email": email
    });

    var config = {
      method: 'post',
      url: '/api/dirigeant',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          setMessage([{ type: "success", message: `${response.data.prenom} inséré avec succès` }])
          setDisplayMessage(true);
          setNom("")
          setPrenom("")
          setEmail("")
          setTimeout(() => {
            setDisplayMessage(false)
          }, 5000)
        } else {
          setMessage([{ type: "error", message: `Veuillez réessayer s'il vous plaît` }])
          setDisplayMessage(true);
          setTimeout(() => {
            setMessage("")
            setDisplayMessage(false)
          }, 5000)
        }
      })
      .catch(function (error) {
        setMessage([{ type: "error", message: `Veuillez remplir tous les champs` }])
        setDisplayMessage(true);
        setTimeout(() => {
          setDisplayMessage(false)
        }, 5000)
      });


  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Formulaire Dirigeant
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)} className={classes.form} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="prenom"
            label="Prénom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <FormControl component="fieldset" className={classes.radio}>
            <RadioGroup row aria-label="position" name="position" defaultValue={genre} required onChange={(e) => setGenre(e.target.value)}>
              <FormLabel component="legend">
                Genre
                <FormControlLabel
                  onChange={(e) => setGenre(e.target.value)}
                  fullWidth
                  className={classes.homme}
                  value="homme"
                  control={<Radio color="primary" />}
                  label="Homme"
                />
                <FormControlLabel
                  onChange={(e) => setGenre(e.target.value)}
                  fullWidth
                  className={classes.homme}
                  value="femme"
                  control={<Radio color="primary" />}
                  label="Femme"
                />
              </FormLabel>
            </RadioGroup>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ajouter nouveau dirigeant
          </Button>
        </form>
        {/* {(message && console.log(message[0].message)} */}
        {

          message ?
            displayMessage ?
              message[0].type === "success" ?
                // <div>success</div>
                <Success message={message[0].message} />
                :
                // <div>error</div>
                <Erreur message={message[0].message} />
              :
              ""
            :
            ""
        }
      </div>
    </Container>
  )
}

export default FormDirigeant
