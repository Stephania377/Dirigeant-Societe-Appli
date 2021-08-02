import React, { useState } from 'react'
import FormDirigeant from '../Components/Home/FormDirigeant/FormDirigeant'
import FormSociete from '../Components/Home/FormSociete/FormSociete'
import Layout from '../Layouts/Layout'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/Select';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(4, 0, 5, 0),

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    text: {
        fontSize: "16px",
        color: "rgb(50,50,50)",
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));

const Home = () => {
    const [displayDirigeant, setDisplayDirigeant] = useState(true)
    const [displaySociete, setDisplaySociete] = useState(false)

    const handleChangeType = (type) => {
        if (type === "dirigeant") {
            setDisplayDirigeant(true);
            setDisplaySociete(false)
        } else {
            setDisplaySociete(true);
            setDisplayDirigeant(false);
        }
    }
    const classes = useStyles();
    return (
        <Layout>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        <NativeSelect
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Age"
                            onChange={(e) => handleChangeType(e.target.value)}
                            name="type"
                        >
                            <MenuItem value="dirigeant">Dirigeant</MenuItem>
                            <MenuItem value="societe">Société</MenuItem>
                        </NativeSelect>
                    </FormControl>

                    {/**condition d'affichage */}
                    {displayDirigeant && <FormDirigeant />}
                    {displaySociete && <FormSociete />}
                </div>
            </Container>
        </Layout>
    )
}

export default Home
