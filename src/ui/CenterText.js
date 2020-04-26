import React from 'react';
import "./CenterText.css";
import {useSelector} from "react-redux";

export function CenterText() {
    const centerText = useSelector(state => state.ui.centerText);
    const isTouch = !!('ontouchstart' in window);

    return (
        <h2 className="centerText" style={isTouch ? {touchAction: "none", pointerEvents: "none"} : {}}>{centerText}</h2>
    );
}
