import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
    },
    title: {

        fontSize: "17px",
    },
    test: {
        margin: theme.spacing(0, 10, 0, 2),
        color: "white", textDecoration: "none"
    }
}));
const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} minWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.test}>Accueil</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/liste" className={classes.test}>Liste par catégorie</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default NavBar
