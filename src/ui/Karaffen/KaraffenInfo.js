import React, {useContext} from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import {makeStyles} from "@material-ui/core/styles";
import {LeereKaraffeButton} from "./LeereKaraffeButton";
import {FuelleKaraffeButton} from "./FuelleKaraffeButton";
import {GiessenStartButton} from "./GiessenStartButton";
import {GiessenEndButton} from "./GiessenEndButton";
import {KaraffenContext} from "./KaraffenRaetsel";

export function KaraffenInfo() {
    const classes = useStyles();
    const {groesse, inhalt, giessenHatGestartet, zielErreicht} = useContext(KaraffenContext);

    return (
        <>
            <h5>{groesse}-Liter Fass</h5>
            <DialogContentText>
                Enthält <strong>{inhalt} Liter</strong>
            </DialogContentText>
            { !zielErreicht && <DialogContentText>
                <LeereKaraffeButton/>
                <FuelleKaraffeButton className={classes.marginLeft}/>
                {
                    giessenHatGestartet?
                        <GiessenEndButton className={classes.marginLeft}/>
                        :
                        <GiessenStartButton className={classes.marginLeft}/>
                }

            </DialogContentText> }
        </>
    );
}


const useStyles = makeStyles(theme => ({
    marginLeft: {
        marginLeft: theme.spacing(1)
    }
}));
