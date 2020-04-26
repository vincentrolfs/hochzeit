import React, {useCallback, useState} from 'react';
import "../CenterText.css";
import {useDispatch, useSelector} from "react-redux";
import {flagFinishedKaraffenRaetsel, setKaraffenRaetselOpen} from "../../redux/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import update from 'immutability-helper';
import {KaraffenInfo} from "./KaraffenInfo";

const ziel = 11;

export function KaraffenRaetsel() {
    const dispatch = useDispatch();
    const [zielErreicht, setzeZielErreicht] = useState(false);

    const handleClose = useCallback(() => {
        dispatch(setKaraffenRaetselOpen(false));
        if (zielErreicht){
            dispatch(flagFinishedKaraffenRaetsel());
        }
    }, [dispatch, zielErreicht]);

    const level2 = useSelector(state => state.flags.startedKaraffenRaetsel2);
    const karaffenGroessen = level2 ? [15, 21, 35] : [15, 8];

    const [karaffen, setKaraffen] = useState(karaffenGroessen.map(() => 0));
    const leereKaraffe = (index) => setKaraffen(update(karaffen, { $splice: [[index, 1, 0]]}));
    const fuelleKaraffe = (index) => setKaraffen(update(karaffen, { $splice: [[index, 1, karaffenGroessen[index]]]}));

    const [giessenStarter, setGiessenStarter] = useState(undefined);
    const starteGiessen = setGiessenStarter;
    const stoppeGiessen = () => setGiessenStarter(undefined);
    const erfuelleGiessen = (giessenTarget) => {
        const newKaraffen = [...karaffen];
        newKaraffen[giessenTarget] = Math.min(karaffen[giessenStarter] + karaffen[giessenTarget], karaffenGroessen[giessenTarget]);
        newKaraffen[giessenStarter] = karaffen[giessenStarter] + karaffen[giessenTarget] - newKaraffen[giessenTarget];
        setKaraffen(newKaraffen);

        stoppeGiessen();

        if (newKaraffen.indexOf(ziel) !== -1){
            setzeZielErreicht(true);
        }
    };

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Fässer auffüllen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Wir brauchen genau {ziel} Liter in einem Fass.
                </DialogContentText>

                {karaffenGroessen.map((groesse, index) =>
                    <KaraffenContext.Provider
                        key={index}
                        value={{
                            groesse,
                            inhalt: karaffen[index],
                            leereKaraffe: () => leereKaraffe(index),
                            fuelleKaraffe: () => fuelleKaraffe(index),
                            starteGiessen: () => starteGiessen(index),
                            beendeGiessen: () => (index === giessenStarter)? stoppeGiessen() : erfuelleGiessen(index),
                            giessenHatGestartet: (giessenStarter !== undefined),
                            istGiessenStarter: (giessenStarter === index),
                            zielErreicht
                        }}
                    >
                        <KaraffenInfo/>
                    </KaraffenContext.Provider>
                )}
            </DialogContent>
            {zielErreicht && <DialogContent>Super, du hast es geschafft!</DialogContent>}
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Schließen
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const KaraffenContext = React.createContext({});

