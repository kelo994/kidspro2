import { Component, OnInit } from '@angular/core';
import { StudentLessonService } from '../../../services/student/lesson.service'
import Phaser from 'phaser';

import MenuScene from '../scenes/MenuScene.js'
import PlayScene from '../scenes/PlayScene.js'
import ResultScene from '../scenes/ResultScene.js'

@Component({
    selector: 'app-phaser-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})

export class PhaserGameComponent implements OnInit {
    phaserGame: Phaser.Game;
    config: Phaser.Types.Core.GameConfig;

    constructor(private sL: StudentLessonService) {
        this.config = {
            type: Phaser.AUTO,
            scene: [MenuScene, PlayScene, ResultScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: 'gameContainer',
                height: 750,
                width: 1300,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            backgroundColor: '#5EF1EC'
        };
    }

    ngOnInit() {
        this.phaserGame = new Phaser.Game(this.config);
        window['angularLink'] = this;
    }

    sendData(actividad, vidas): void {
        let data = {
            actividad_id: localStorage.getItem('idActividad'),
            numero: actividad,
            vidas: vidas,
            estudiante_id: localStorage.getItem('idEstudiante'),
            bloque_id: localStorage.getItem('fastBloque')
        }
        this.sL.sendActivityData(data).subscribe(data => {
            localStorage.setItem('idActividad', data.toString());
        });
    }

}