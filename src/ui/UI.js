import React from 'react';
import {CenterText} from "./CenterText";
import {InteractionText} from "./InteractionText";
import {KaraffenRaetsel} from "./Karaffen/KaraffenRaetsel";
import {useSelector} from "react-redux";

export function UI() {
    const karaffenRaetselOpen = useSelector(state => state.ui.karaffenRaetselOpen);

    return (
        <>
            <CenterText/>
            <InteractionText/>
            {karaffenRaetselOpen && <KaraffenRaetsel/>}
        </>
    );
}
