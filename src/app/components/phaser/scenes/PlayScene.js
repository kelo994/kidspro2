class PlayScene extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });

        this.vidas = 3;
        this.arrayVidas = []
        this.errores = 0;
        this.fondos = [];
        this.enunciado;
        this.enunciados = [
            'Daniela debe cobrar estos artículos,\nayúdala a contar la cantidad de árticulos',
            'Las clases acaban de terminar',
            'Hugo y Benjamín deben ordenar sus juguetes',
            'La jungla fue invadida por monos',
            '¿Cuántos árticulos hay?',
            '¿Cuántos niños están esperando el Bus?',
            '¿Cuántos juguetes deben ordenar?',
            '¿Cuántos monos puedes ver?'
        ]
        
        this.startTime = new Date();
        this.totalTime = 0;
        this.gameTimer;
        this.timeLabel;

        this.indiceCorrecto;
        this.valorCorrecto;
        this.valores = [];

        this.textButtons = [];
        this.buttons = []
        this.elementos = [];
    }

    init (data) {
        this.actividad = data.actividad;
    }

    preload() {
        this.load.image('enunciado', 'assets/images/games/enunciado.png');
        this.load.image('corazon', 'assets/images/games/corazon.png');
        this.load.spritesheet('button1', 'assets/images/games/buttons/button1.png', { frameWidth: 256, frameHeight: 64 });
        this.load.spritesheet('button2', 'assets/images/games/buttons/button2.png', { frameWidth: 256, frameHeight: 64 });
        this.load.spritesheet('button3', 'assets/images/games/buttons/button3.png', { frameWidth: 256, frameHeight: 64 });
        this.load.spritesheet('button4', 'assets/images/games/buttons/button4.png', { frameWidth: 256, frameHeight: 64 });
        // Elementos
        this.load.image('queso', 'assets/images/games/elementos/queso.png');
    }

    create() {

        this.setFondos()
        this.setEnunciado()
        this.resetVidas()
        
        localStorage.setItem('idActividad', 0);

        // Timer
        this.createTimer();
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: () => { this.updateTimer() },
            callbackScope: this,
            loop: true
        });
    
        // Resolución
        this.scale.on('resize', (gameSize) => {
            this.cameras.main.width = gameSize.width
            this.cameras.main.height = gameSize.height
            this.cameras.resize(gameSize.width, gameSize.height)
        })

        this.iniciarElementos()

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
        
    }

    render () {
        
    }

    update () {
    }

    iniciarElementos () {
        this.valorCorrecto = Math.floor(Math.random() * 9) + 1;
        this.indiceCorrecto = Math.floor(Math.random() * 4);
        this.valores[this.indiceCorrecto] = this.valorCorrecto;

        for (var i = 0; i < this.valorCorrecto; i++) {
            this.elementos[i] = this.add.image(150 + i * 100, 470, 'queso');
            this.elementos[i].setOrigin(0, 0);
            this.elementos[i].setDisplaySize(100, 100);
        }
        
        for (var i = 0; i < 4; i++)
        {
            this.buttons[i] = this.add.image(200 + i * 300, 610, 'button' + (i + 1));
            this.buttons[i].name = i.toString();
            this.buttons[i].setDisplaySize(240, 64);
            this.buttons[i].setInteractive();
            this.buttons[i].on('clicked', this.onClick, this);

            if (i === this.indiceCorrecto) {
                this.textButtons[i] = this.add.text(190 + i * 300, 590, this.valorCorrecto, { font: '40px Arial' });
            } else {
                var valor = this.getRandomValue()
                this.valores[i] = valor
                this.textButtons[i] = this.add.text(190 + i * 300, 590, valor, { font: '40px Arial' });
            }
        }
        //button.setVisible(false);
    }

    onClick (button) {
        if (button.name === this.indiceCorrecto.toString()) {
            // Enviamos los datos
            window.angularLink.sendData(this.actividad, this.vidas);
            this.resetScene()
        } else {
            this.vidas--
            this.arrayVidas[this.vidas].destroy();
            this.errores++
        }

        if (this.vidas === 0) {
            this.scene.start('menu');
        }
    }

    getRandomValue () {
        var random = Math.floor(Math.random() * 9) + 1
        var state = this.valores.find(e => e === random)
        if (typeof state === 'number') {
            return this.getRandomValue()
        } else {
            return random
        }
    }

    siguienteEnunciado () {
        this.enunciado.text = '¡Correcto!';
        this.enunciado.setX(580);
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.elementos.forEach(e => { e.destroy() });
                this.fondos[this.actividad - 2].setVisible(false);
                this.fondos[this.actividad - 1].setVisible(true);
                this.enunciado.text = this.enunciados[this.actividad - 1];
                this.enunciado.setX(290);
                this.resetVidas();
            },
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 3500,
            callback: () => {
                this.enunciado.text = this.enunciados[this.actividad + 3];
                this.iniciarElementos();
            },
            callbackScope: this,
            loop: false
        });
    }

    setFondos () {
        for (var i = 0; i < 4; i++) {
            if (i === 0) this.fondos[i] = this.add.image(0, -120, 'fondo' + (i + 1));
            else this.fondos[i] = this.add.image(0, 0, 'fondo' + (i + 1));
            this.fondos[i].setOrigin(0, 0);
            if (i === 0) this.fondos[i].setScale(0.7);
            else this.fondos[i].setScale(0.23);
            this.fondos[i].setVisible(false);
        }        
        this.fondos[0].setVisible(true);
    }

    setEnunciado () {
        var enunciadoImage = this.add.image(240, 30, 'enunciado');
        enunciadoImage.setOrigin(0, 0);
        enunciadoImage.setDisplaySize(820, 100);
        enunciadoImage.setTint(0x00DCFF);

        this.enunciado = this.add.text(290, 35, this.enunciados[0], { font: '40px Arial', fill: '#fff', align: 'center' });
        this.enunciado.setOrigin(0, 0);
        this.enunciado.setAlign('center');
        //this.enunciado.setDisplaySize(800, 80);
    }
    
    createTimer () {
        this.add.text(1150, 30, "Tiempo", {font: "bold 34px Arial", fill: "#fff"});
        this.timeLabel = this.add.text(1165, 60, "00:00", {font: "bold 34px Arial", fill: "#fff"});
    }

    updateTimer () {
        var currentTime = new Date();
        var timeDifference = currentTime.getTime() - this.startTime.getTime();

        this.totalTime = Math.abs(timeDifference / 1000);

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(this.totalTime / 60);
        var seconds = Math.floor(this.totalTime) - (60 * minutes);

        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        this.timeLabel.text = result;
    }

    resetVidas () {
        for (var i = 0; i < this.vidas; i++) {
            if (this.actividad > 1) this.arrayVidas[i].destroy();
            this.arrayVidas[i] = this.add.image(20 + i * 65, 30, 'corazon');
            this.arrayVidas[i].setOrigin(0, 0);
            this.arrayVidas[i].setDisplaySize(60, 60);
        }
    }

    resetScene () {
        this.actividad++
        if (this.actividad > 4) {
            this.enunciado.text = '¡Correcto!';
            this.enunciado.setX(580);
            this.time.addEvent({
                delay: 1500,
                callback: () => { this.scene.start('result', { errores: this.errores }) },
                callbackScope: this,
                loop: false
            });
        } else {
            this.vidas = 3
            this.valores = []
            this.textButtons.forEach(e => { e.destroy() });
            this.buttons.forEach(e => { e.destroy() });
            this.siguienteEnunciado()
        }   
    }
}

export default PlayScene