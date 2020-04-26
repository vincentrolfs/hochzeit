import React from 'react';
import "./CenterText.css";
import {useSelector} from "react-redux";

export function CenterText() {
    const centerText = useSelector(state => state.ui.centerText);
    return (
        <h2 className="centerText">{centerText}</h2>
    );
}
