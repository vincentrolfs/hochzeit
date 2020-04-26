import React from 'react';
import "./CenterText.css";
import "./InteractionText.css";
import {useSelector} from "react-redux";

export function InteractionText() {
    const interactionText = useSelector(state => state.ui.interactionText);
    const isTouch = !!('ontouchstart' in window);

    if (!interactionText) {
        return null;
    }

    return (
        <div className="interactionText">
            {interactionText}

            <div className="controlHint">Leertaste{isTouch && ' / Antippen'}</div>
        </div>
    );
}
