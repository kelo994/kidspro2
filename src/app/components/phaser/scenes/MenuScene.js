class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        this.load.spritesheet('button', 'assets/images/student/boton-jugar.png', { frameWidth: 400, frameHeight: 180 });
        this.load.audio('audio', 'assets/images/games/Rainbow_Forest.mp3');
        this.load.image('fondo1', 'assets/images/games/fondos/cajera.png');
        this.load.image('fondo2', 'assets/images/games/fondos/escuela.png');
        this.load.image('fondo3', 'assets/images/games/fondos/juguetes.png');
        this.load.image('fondo4', 'assets/images/games/fondos/monos.png');
    }

    create() {
        var music = this.sound.add('audio');
        music.play();

        var btnStart = this.add.image(650, 325, 'button');
        btnStart.setInteractive();

        btnStart.on('clicked', () => {
            this.scene.start('playGame', { actividad: 1 });
        }, this);

        /*var btnFull = this.add.image(150, 150, 'button2');
        btnFull.setInteractive();

        btnFull.on('clicked', () => {
            this.goFullScreen()
        }, this);*/

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
    }

    goFullScreen() {

        window['gameContainer']['canvas'][this.game.device.fullscreen.request]();
    
    }
}

export default MenuScene;