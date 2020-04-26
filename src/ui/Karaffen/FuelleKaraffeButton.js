import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {KaraffenContext} from "./KaraffenRaetsel";

export function FuelleKaraffeButton({className}) {
    const {fuelleKaraffe, giessenHatGestartet, inhalt, groesse} = useContext(KaraffenContext);
    return (
        <Button variant="contained" color="primary" disableElevation className={className}
                onClick={fuelleKaraffe}
                disabled={giessenHatGestartet || (inhalt === groesse)}
        >
            Mit Wasser füllen
        </Button>
    );
}
