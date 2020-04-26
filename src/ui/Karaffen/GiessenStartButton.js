import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {KaraffenContext} from "./KaraffenRaetsel";

export function GiessenStartButton({className}) {
    const {starteGiessen, inhalt} = useContext(KaraffenContext);
    return (
        <Button variant="contained" color="primary" disableElevation className={className}
                onClick={starteGiessen} disabled={inhalt === 0}
        >
            In eine andere Karaffe gießen
        </Button>
    );
}
