import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    codepostal: {
        width: '40%',
        marginRight: "10%"
    }
}));

export default function CodePostal({handleSetCodePostal, allCodePostal}) {
    const classes = useStyles();
    return (

        <FormControl className={classes.codepostal}>
            <InputLabel htmlFor="demo-customized-select-native">Code postal</InputLabel>
            <NativeSelect
                id="demo-customized-select-native"
                onChange={handleSetCodePostal}
                input={<BootstrapInput />}
            >
                {
                    allCodePostal.map(codePostal => {
                        return <option value={codePostal.id}>{codePostal.code}</option>
                    })
                }

            </NativeSelect>
        </FormControl>

    );
}
