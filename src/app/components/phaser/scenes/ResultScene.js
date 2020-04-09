class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: 'result' });
    }

    init (data) {
        this.errores = data.errores;
    }

    preload() {
    }

    create() {
        this.sound.stopAll();
        this.add.text(320, 30, 'LECCION \nCOMPLETADA', { font: '100px Arial', fill: '#fff', align: 'center' });
        this.add.text(490, 285, localStorage.getItem('studentName'), { font: '60px Arial', fill: '#fff', align: 'center' });
        this.add.text(490, 370, 'Errores: ' + this.errores.toString(), { font: '40px Arial', fill: '#fff', align: 'center' });

        var btnStart = this.add.image(650, 550, 'button1');
        btnStart.setInteractive();
        this.add.text(600, 525, 'Inicio', { font: '40px Arial', fill: '#fff', align: 'center' });

        btnStart.on('clicked', () => {
            this.scene.start('menu');
        }, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
    }
}

export default ResultScene;