import {store} from "../store";

export const SET_INTERACTION_TEXT = 'SET_INTERACTION_TEXT';
export const setInteractionText = text => ({
    type: SET_INTERACTION_TEXT,
    text
});

export const SET_CENTER_TEXT = 'SET_CENTER_TEXT';
export const setCenterText = text => ({
    type: SET_CENTER_TEXT,
    text
});

export const SET_KARAFFEN_RAETSEL_OPEN = 'SET_KARAFFEN_RAETSEL_OPEN';
export const setKaraffenRaetselOpen = isOpen => ({
    type: SET_KARAFFEN_RAETSEL_OPEN,
    isOpen
});

export const IMPORT_FLAGS = 'IMPORT_FLAGS';
export const importFlags = flags => ({
    type: IMPORT_FLAGS,
    flags
});

export const FLAG_INTRO_BEENDET = 'FLAG_INTRO_BEENDET';
export const flagIntroBeendet = () => ({
    type: FLAG_INTRO_BEENDET
});

const hasFinishedKaraffenRaetsel1 = () => store.getState().flags.finishedKaraffenRaetsel1;
export const FLAG_STARTED_KARAFFEN_RAETSEL_1 = 'FLAG_STARTED_KARAFFEN_RAETSEL_1';
export const FLAG_STARTED_KARAFFEN_RAETSEL_2 = 'FLAG_STARTED_KARAFFEN_RAETSEL_2';
export const flagStartKaraffenRaetsel = () => ({
    type: (hasFinishedKaraffenRaetsel1()) ? FLAG_STARTED_KARAFFEN_RAETSEL_2 : FLAG_STARTED_KARAFFEN_RAETSEL_1
});

export const FLAG_FINISHED_KARAFFEN_RAETSEL_1 = 'FLAG_FINISHED_KARAFFEN_RAETSEL_1';
export const FLAG_FINISHED_KARAFFEN_RAETSEL_2 = 'FLAG_FINISHED_KARAFFEN_RAETSEL_2';
export const flagFinishedKaraffenRaetsel = () => ({
    type: (hasFinishedKaraffenRaetsel1()) ? FLAG_FINISHED_KARAFFEN_RAETSEL_2 : FLAG_FINISHED_KARAFFEN_RAETSEL_1
});

export const FLAG_FROSCH_NASS = 'FLAG_FROSCH_NASS';
export const flagFroschNass = () => ({
    type: FLAG_FROSCH_NASS
});

export const FLAG_CASHFLOW_ABGEGEBEN = 'FLAG_CASHFLOW_ABGEGEBEN';
export const flagCashflowAbgegeben = () => ({
    type: FLAG_CASHFLOW_ABGEGEBEN
});

export const FLAG_KARAFFE_RINI_GEGEBEN = 'FLAG_KARAFFE_RINI_GEGEBEN';
export const flagKaraffeRiniGegeben = () => ({
    type: FLAG_KARAFFE_RINI_GEGEBEN
});

export const FLAG_FROSCH_AUS_TEICH_BEFREIT = 'FLAG_FROSCH_AUS_TEICH_BEFREIT';
export const flagFroschAusTeichBefreit = () => ({
    type: FLAG_FROSCH_AUS_TEICH_BEFREIT
});

export const FLAG_SELBSTZERSTOERUNG_EINGELEITET = 'FLAG_SELBSTZERSTOERUNG_EINGELEITET';
export const flagSelbstzerstoerungEingeleitet = () => ({
    type: FLAG_SELBSTZERSTOERUNG_EINGELEITET
});

export const FLAG_MIRCO_VERWANDELT = 'FLAG_MIRCO_VERWANDELT';
export const flagMircoVerwandelt = () => ({
    type: FLAG_MIRCO_VERWANDELT
});
