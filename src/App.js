import React from 'react';
import './App.css';
import {Zuk} from "./zuk/Zuk";
import {UI} from "./ui/UI";
import Button from "@material-ui/core/Button";

export function App() {
    return (
        <>
            <div id="menu">
                <div>Musik <input type="checkbox" id="musicEnabled"/></div>
                <div>Sound <input type="checkbox" id="soundEnabled"/></div>
                <div><Button color="primary" id="save">Speichern</Button></div>
            </div>

            <Zuk/>

            <UI/>
        </>
    );
}
