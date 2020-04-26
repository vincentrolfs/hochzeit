import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {KaraffenContext} from "./KaraffenRaetsel";

export function LeereKaraffeButton() {
    const {leereKaraffe, giessenHatGestartet, inhalt} = useContext(KaraffenContext);
    return (
        <Button variant="contained" color="secondary" disableElevation
                onClick={leereKaraffe}
                disabled={giessenHatGestartet || (inhalt === 0)}
        >
            Leeren
        </Button>
    );
}
