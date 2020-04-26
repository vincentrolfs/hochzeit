import {
    FLAG_CASHFLOW_ABGEGEBEN,
    FLAG_FINISHED_KARAFFEN_RAETSEL_1,
    FLAG_FINISHED_KARAFFEN_RAETSEL_2,
    FLAG_FROSCH_AUS_TEICH_BEFREIT,
    FLAG_FROSCH_NASS,
    FLAG_INTRO_BEENDET,
    FLAG_KARAFFE_RINI_GEGEBEN,
    FLAG_MIRCO_VERWANDELT,
    FLAG_SELBSTZERSTOERUNG_EINGELEITET,
    FLAG_STARTED_KARAFFEN_RAETSEL_1,
    FLAG_STARTED_KARAFFEN_RAETSEL_2,
    IMPORT_FLAGS
} from "../actions";

const defaultState = {
    introBeendet : false,
    startedKaraffenRaetsel1: false,
    finishedKaraffenRaetsel1: false,
    startedKaraffenRaetsel2: false,
    finishedKaraffenRaetsel2: false,
    froschIstNass: false,
    cashflowAbgegeben: false,
    karaffeRiniGegeben: false,
    froschAusTeichBefreit: false,
    selbstzerstoerungEingeleitet: false,
    mircoVerwandelt: false,
};

export const flags = (state = defaultState, action) => {
    switch (action.type) {
        case IMPORT_FLAGS:
            return {
                ...state,
                ...action.flags
            };
        case FLAG_INTRO_BEENDET:
            return {
                ...state,
                ...{introBeendet: true}
            };
        case FLAG_STARTED_KARAFFEN_RAETSEL_1:
            return {
                ...state,
                ...{startedKaraffenRaetsel1: true}
            };
        case FLAG_FINISHED_KARAFFEN_RAETSEL_1:
            return {
                ...state,
                ...{finishedKaraffenRaetsel1: true}
            };
        case FLAG_STARTED_KARAFFEN_RAETSEL_2:
            return {
                ...state,
                ...{startedKaraffenRaetsel2: true}
            };
        case FLAG_FINISHED_KARAFFEN_RAETSEL_2:
            return {
                ...state,
                ...{finishedKaraffenRaetsel2: true}
            };
        case FLAG_FROSCH_NASS:
            return {
                ...state,
                ...{froschIstNass: true}
            };
        case FLAG_CASHFLOW_ABGEGEBEN:
            return {
                ...state,
                ...{cashflowAbgegeben: true}
            };
        case FLAG_KARAFFE_RINI_GEGEBEN:
            return {
                ...state,
                ...{karaffeRiniGegeben: true}
            };
        case FLAG_FROSCH_AUS_TEICH_BEFREIT:
            return {
                ...state,
                ...{froschAusTeichBefreit: true}
            };
        case FLAG_SELBSTZERSTOERUNG_EINGELEITET:
            return {
                ...state,
                ...{selbstzerstoerungEingeleitet: true}
            };
        case FLAG_MIRCO_VERWANDELT:
            return {
                ...state,
                ...{mircoVerwandelt: true}
            };
        default:
            return state
    }
}
