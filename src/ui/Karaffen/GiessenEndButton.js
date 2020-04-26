import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {KaraffenContext} from "./KaraffenRaetsel";

export function GiessenEndButton({className}) {
    const {beendeGiessen, istGiessenStarter} = useContext(KaraffenContext);
    return (
        <Button variant="contained" color={istGiessenStarter? "secondary" : "primary"} disableElevation className={className}
                onClick={beendeGiessen}
        >
            {istGiessenStarter ? "Abbrechen" : "Hierein giessen"}
        </Button>
    );
}
