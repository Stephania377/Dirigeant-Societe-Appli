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
    },
    texte: {
        width: "100%",
        margin: theme.spacing(5, 0, 5, 0),
        textAlign: "center",
    },
    tablecell:{
        fontWeight:"bold",
        fontSize:"16px",
    },
}));
const AllSociety = () => {
    const classes = useStyles();
    const [allSociety, setAllSociety] = useState([]);
    useEffect(() => {
        var configSociety = {
            method: 'get',
            url: '/api/societe',
        };
        console.log("use Effect2")
        axios(configSociety)
            .then(function (response) {
                // console.log(response.data)
                if (response.data) {
                    let data = response.data.reverse();
                    setAllSociety(data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <>
            <Typography component="h1" variant="h5" className={classes.texte}>
                Liste des sociétés inscrites ({allSociety && allSociety.length})
            </Typography>
            {
                allSociety ?
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablecell}>Nom de la société</TableCell>
                                    <TableCell align="center" className={classes.tablecell}>Description</TableCell>
                                    <TableCell align="center" className={classes.tablecell}>Type de la société</TableCell>
                                    <TableCell align="center" className={classes.tablecell}>Code postal</TableCell>
                                    <TableCell align="center" className={classes.tablecell}>Ville</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    allSociety ?
                                        allSociety.map((society) => {

                                            return <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {society.nom}
                                                </TableCell>
                                                <TableCell align="center" >{society.description}</TableCell>
                                                <TableCell align="center" >{society.typeSocietes.map(type => type.nom + ' , ')}</TableCell>
                                                <TableCell align="center" >{society.ville.codePostal.code}</TableCell>
                                                <TableCell align="center" >{society.ville.nom}</TableCell>
                                            </TableRow>
                                        })
                                        :
                                        <Chargement />
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                <Chargement />

            }

        </>
    )
}

export default AllSociety
