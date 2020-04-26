import {SET_CENTER_TEXT, SET_INTERACTION_TEXT, SET_KARAFFEN_RAETSEL_OPEN} from "../actions";

const defaultState = {
    interactionText: "",
    centerText: "",
    karaffenRaetselOpen: false,
    karaffenGroessen: [15, 8],
};

export const ui = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INTERACTION_TEXT:
            return {
                ...state,
                ...{ interactionText: action.text }
            };
        case SET_CENTER_TEXT:
            return {
                ...state,
                ...{ centerText: action.text }
            };
        case SET_KARAFFEN_RAETSEL_OPEN:
            return {
                ...state,
                ...{ karaffenRaetselOpen: action.isOpen }
            };
        default:
            return state
    }
}
