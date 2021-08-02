import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import CodePostal from './CodePostal';
import AllVille from './AllVille';
import Success from '../../Utils/Alert/Success';
import Erreur from '../../Utils/Alert/Erreur';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  s: {
    color: "rgb(50,50,50)",
    width: "210px"
  },
  check: {
    margin: theme.spacing(1, 0, 0, 1.7),
  },
  margin: {
    width: "49%",
  },
  margina: {
    width: "49%",
    float: "right",
  },
  text: {
    fontSize: "16px",
    color: "rgb(50,50,50)",
  }
}));

const FormSociete = () => {
  const classes = useStyles();
  const [nomSociete, setNomSociete] = useState("") //texte
  const [description, setDescription] = useState("") //text-area
  const [type, setType] = useState([]) //check
  const [codePostal, setCodePostal] = useState(null) //liste deroulante
  const [ville, setVille] = useState() //texte


  const [message, setMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [allType, setAllType] = useState();
  const [allVille, setAllVille] = useState(false);
  const [allCodePostal, setAllCodePostal] = useState();

  const handleChangeType = (e) => {
    let id = parseInt(e.target.id)
    if (e.target.checked) {
      setType([
        ...type, id
      ]);
    } else {
      let typeTemp = type;
      typeTemp = typeTemp.filter(element => id !== element);
      setType(typeTemp);
    }
  }


  const handleSetCodePostal = (e) => {
    let id = parseInt(e.target.value)

    var config = {
      method: 'get',
      url: `/api/code/${id}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
        if (response.data) {
          setAllVille(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSetVille = (e) => {
    let id = parseInt(e.target.value)
    setVille(id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nomSociete, description, type, ville)
    var data = JSON.stringify({
      "nom": nomSociete,
      "description": description,
      "type": type,
      "ville": ville
    });

    var config = {
      method: 'post',
      url: '/api/societe',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data) {
          setMessage([{ type: "success", message: `La société ${response.data.nom} a a été inséré avec succès` }])
          setDisplayMessage(true)
          setNomSociete("")
          setDescription("")
          setType([])
          setVille("")
          setTimeout(() => {
            setDisplayMessage(false)
          }, 5000)
        }
      })
      .catch(function (error) {
        setMessage([{ type: "error", message: `Veuillez remplir tous les champs` }])
        setDisplayMessage(true)
        setTimeout(() => {
          setDisplayMessage(false)
        }, 5000)
      });
  }


  useEffect(() => {
    var config = {
      method: 'get',
      url: '/api/type-societe',
    };

    axios(config)
      .then(function (response) {
        setAllType(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    // /////////////////////////////////
    var config2 = {
      method: 'get',
      url: '/api/code',
      headers: {}
    };

    axios(config2)
      .then(function (response) {
        setAllCodePostal(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Formulaire Société
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)} className={classes.form} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom de la société"
            name="name"
            autoComplete="name"
            autoFocus
            value={nomSociete}
            onChange={(e) => setNomSociete(e.target.value)}
          />

          <TextField
            multiline={true}
            rows={3}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description de la société"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <FormControl component="fieldset" className={classes.check}>
            <FormLabel component="legend">Type de la société</FormLabel>


            <FormGroup aria-label="position" row>
              {
                allType && allType.map(element => {
                  return <FormControlLabel
                    className={classes.s}
                    value={element.nom}
                    control={<Checkbox onChange={handleChangeType} id={element.id} color="primary" />}
                    label={element.nom}
                    labelPlacement="end"
                  />
                })
              }
            </FormGroup>
          </FormControl>

          {/* ********************************************** */}
          {
            allCodePostal &&
            <CodePostal
              handleSetCodePostal={handleSetCodePostal}
              allCodePostal={allCodePostal}
            />
          }

          {/* ********************************************** */}

          {/* ********************************************** */}
          {
            allVille &&
            <AllVille
              handleSetVille={handleSetVille}
              allVille={allVille}
            />
          }
          {/* ********************************************** */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ajouter nouvelle société
          </Button>
          {
            displayMessage ?
              message[0].type == "success" ?
                <Success message={message[0].message} />
                :
                <Erreur message={message[0].message} />
              :
              ""
          }
        </form>
      </div>
    </Container>
  )
}

export default FormSociete
