import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chargement from '../Utils/Chargement';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        backgroundColor:"white",
    },
    tablecell:{
        fontWeight:"bold",
        fontSize:"16px",
    },
    texte: {
        width: "100%",
        margin: theme.spacing(5, 0, 5, 0),
        textAlign: "center",
    },
    testa: {
        margin: theme.spacing(25, 0, 0, 0),
    },
}));
const AllDirigeants = () => {
    const classes = useStyles();
    const [allDirigeant, setAllDirigeant] = useState([]);

    useEffect(() => {
        console.log("use Effect1")
        var configDirigeant = {
            method: 'get',
            url: '/api/dirigeant',

        };

        axios(configDirigeant)
            .then(function (response) {
                if (response.data) {
                    let data = response.data.reverse();
                    setAllDirigeant(data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <>
            
            <Typography component="h1" variant="h5" className={classes.texte}>
                Liste des dirigeants inscrits ({allDirigeant && allDirigeant.length})
            </Typography>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>Nom</TableCell>
                            <TableCell align="center" className={classes.tablecell}>Prénom</TableCell>
                            <TableCell align="center" className={classes.tablecell}>Sexe</TableCell>
                            <TableCell align="center" className={classes.tablecell}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allDirigeant ?
                                allDirigeant.map((dirigeant) => (
                                    <TableRow key={dirigeant.id}>
                                        <TableCell component="th" scope="row">
                                            {dirigeant.nom}
                                        </TableCell>
                                        <TableCell align="center" >{dirigeant.prenom}</TableCell>
                                        <TableCell align="center" >{dirigeant.genre}</TableCell>
                                        <TableCell align="center" >{dirigeant.email}</TableCell>
                                    </TableRow>
                                )) :
                                <Chargement />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default AllDirigeants
