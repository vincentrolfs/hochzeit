import React, {useEffect, useRef} from "react";
import {Quintus} from './lib/quintus/quintus';
import './lib/quintus/quintus_sprites';
import './lib/quintus/quintus_scenes';
import './lib/quintus/quintus_input';
import './lib/quintus/quintus_2d';
import './lib/quintus/quintus_anim';
import './lib/quintus/quintus_tmx';
import './lib/quintus/quintus_touch';
import './lib/quintus/quintus_ui';
import './lib/quintus/quintus_audio';
import './lib/seedrandom.min';
import './lib/zepto.min';
import {CANVAS_ID} from "./utils/constants";
import {Game} from "./classes/Game";
import {AudioHandler} from "./classes/AudioHandler";
import {UIHandler} from "./classes/UIHandler";
import {LoadingHandler} from "./classes/LoadingHandler";
import {Map} from "./classes/Map";
import {Person} from "./classes/Person";
import {Item} from "./classes/Item";
import {Invisible} from "./classes/Invisible";
import {SmartControls} from "./components/SmartControls";
import {PlayerFunctions} from "./components/PlayerFunctions";
import {addMaps} from "./maps/addMaps";

export function Zuk() {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            startZuk(ref.current);
        }
    }, []);

    return <canvas id={CANVAS_ID} ref={ref}/>;
}

function startZuk(canvasElement) {
    canvasElement.height = window.innerHeight / 2;
    canvasElement.width = window.innerWidth / 2 - 10;

    const Q = Quintus({
        development: false,
        audioSupported: ["mp3"],
        dataPath: 'maps/'
    })
        .include("Sprites, Scenes, Input, 2D, Anim, TMX, UI, Audio")
        .setup(CANVAS_ID)

    Q.input.keyboardControls();

    if ('ontouchstart' in window) {
        window.ontouchstart = () => {
            Q.input.trigger('action');
        };
    }

    Q.audio.enableWebAudioSound();

    Q.input.keyboardControls({
        X: "action",
        Z: "action",
        SPACE: "action",
        ENTER: "action",
        81: "action", 	// "Q"
        69: "action", 	// "E"
        87: "up",		// "W"
        65: "left",		// "A"
        83: "down",		// "S"
        68: "right"		// "D"
    });

    Q.input.mouseControls({

        cursor: "default",
        stageNum: 1

    });

    // No gravity please
    Q.gravityX = Q.gravityY = 0;

    Q.el.style.height = 2 * Q.el.height + "px";
    Q.el.style.width = 2 * Q.el.width + "px";

    Q.wrapper.style.height = 2 * Q.el.height + "px";
    Q.wrapper.style.width = 2 * Q.el.width + "px";

    Game(Q);
    AudioHandler(Q);
    UIHandler(Q);
    LoadingHandler(Q);
    Map(Q);
    Person(Q);
    Item(Q);
    Invisible(Q);
    SmartControls(Q);
    PlayerFunctions(Q);

    const zuk = new Q.Game();

    addMaps(zuk);
    zuk.start();
}
