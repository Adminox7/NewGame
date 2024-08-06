
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: 0xffffff,
};

const game = new Phaser.Game(config);

class startGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
    this.m = 'nomeut';
    this.x = 'music';
    this.click = 2;
  }

  preload() {
    this.load.image('room', './assets/bg start.png');
    this.load.image('start', './assets/إلعب الآن.png');
    this.load.image('parametre', './assets/parametre.png');
    this.load.image('meut', './assets/meut.png');
    this.load.image('nomeut', './assets/nomeut.png');
    this.load.image('music', './assets/music.png');
    this.load.image('nomusic', './assets/nomusic.png');
    this.load.audio('clickeff', './assets/clickeff.wav');
    this.load.image('miniLatifa', './assets/loading/miniLatifa.png');
  }

  create() {
    this.add.image(400, 250, 'room').setScale(0.45);

    this.start = this.add.image(400, 435, 'start').setScale(0.5);
    this.start.setInteractive({ useHandCursor: true });
    this.start.on('pointerdown', () => this.startGame());

    this.meut = this.add.image(750, 50, 'nomeut').setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(750, 50, 'music').setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(750, 50, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    this.clickeff = this.sound.add('clickeff');
  }

  update() {}

  startGame() {
    this.scene.start('LoadingScene');
    this.clickeff.play();
  }

  parametreGame() {
    this.clickeff.play();

  
    this.tweens.add({
      targets: this.parametre,
      angle: 180,
      duration: 300,
      ease: 'Linear',
      yoyo: true,
    });

    if (this.click === 1) {
      this.tweens.add({
        targets: this.meut,
        y: 50,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 50,
            duration: 500,
          });
        }
      });
      
      this.click = 2;
    } else if (this.click === 2) {
      this.music.setScale(1)
      this.meut.setScale(0.035)
      this.tweens.add({
        targets: this.meut,
        y: 105,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 150,
            duration: 500,
          });
        }
      });

      this.click = 1;
    }
  }

  clickMeut() {
    if (this.m === 'nomeut') {
      this.meut.setTexture('meut').setScale(1);
      this.m = 'meut';
    } else if (this.m === 'meut') {
      this.meut.setTexture('nomeut').setScale(0.035);
      this.m = 'nomeut';
    }
  }

  clickMusic() {
    if (this.x === 'music') {
      this.music.setTexture('nomusic');
      this.x = 'nomusic';
      this.clickeff.setMute(true);
    } else if (this.x === 'nomusic') {
      this.music.setTexture('music');
      this.x = 'music';
      this.clickeff.setMute(false);
      this.clickeff.play();
    }
  }
}

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
 
    // Afficher l'image de chargement
    // this.add.image(400, 200, 'loading');
    this.add.image(450, 250, 'miniLatifa');

    // Créer une barre de progression
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    // Afficher le texte de chargement
    let loadingText = this.make.text({
      x: 400,
      y: 300,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // Mettre à jour la barre de progression
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // Nettoyer une fois le chargement terminé
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
//////////////////////////
    // Charger les assets nécessaires pour le jeu
    this.load.image('room1', './assets/room.png');
    this.load.image('flish-left', './assets/flish-left.png');
    this.load.image('flish-right', './assets/flish-right.png');
    this.load.image('caracter', './assets/1x/latifa.png');
    this.load.image('parametre', './assets/parametre.png');
    this.load.image('meut', './assets/meut.png');
    this.load.image('nomeut', './assets/nomeut.png');
    this.load.image('music', './assets/music.png');
    this.load.image('nomusic', './assets/nomusic.png');
    this.load.audio('clickeff', './assets/clickeff.wav');
    this.load.audio('cute', './assets/cute.wav');
    this.load.image('valide', './assets/valide.png');
    this.load.image('bgStage', './assets/bgMalabis.png');
/////////////////////////////////
    // HAIR
    for (let i = 1; i <= 6; i++) {
      this.load.image(`HAIR${i}`, `./assets/1x/dra${i}.png`);
    }

    // Clothes
    for (let i = 1; i <= 6; i++) {
      this.load.image(`clothes${i}`, `./assets/1x/labsa${i}.png`);
    }

    // Shoes
    for (let i = 1; i <= 6; i++) {
      this.load.image(`shoes${i}`, `./assets/1x/sabat${i}.png`);
    }

    // miniDara
    for (let i = 1; i <= 6; i++) {
      this.load.image(`miniDra${i}`, `./assets/1x/miniDra${i}.png`);
    }

    
    for (let i = 1; i <= 8; i++) {
      this.load.image(`stage${i}`, `./assets/stage/stage${i}.png`);
    }
  }

  create() {
    // Passer à la scène principale une fois les assets chargés
    this.scene.start('Malabis');
  }
}


 

class Malabis extends Phaser.Scene {
  constructor() {
    super({ key: 'Malabis' });
    this.chose = {
      clothes: ['clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6'],
      sbabt: ['shoes1', 'shoes2', 'shoes3', 'shoes4', 'shoes5', 'shoes6'],
      miniDra: ['miniDra1', 'miniDra2', 'miniDra3', 'miniDra4', 'miniDra5', 'miniDra6'],
      HAIR: ['HAIR1', 'HAIR2', 'HAIR3', 'HAIR4', 'HAIR5', 'HAIR6'],
    };
    this.swith = ['miniDra', 'clothes', 'HAIR', 'sbabt'];
    this.fin = 0;
    this.currentImages = [];
    this.m = 'nomeut';
    this.x = 'music';
    this.click = 2;
    this.stagenum = 0;
  }

  preload() {
    // Load your assets here
  }

  create() {
    this.valider();
    this.meut = this.add.image(750, 50, 'nomeut').setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(750, 50, 'music').setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(750, 50, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());
  }

  updateImages() {
    // Destroy the current images
    this.currentImages.forEach(image => image.destroy());
    this.currentImages = [];

    const currentCategory = this.swith[this.fin];
    const items = this.chose[currentCategory];

    items.forEach((item, index) => {
      const x = 340 / 2 + (index * 80);
      let image = this.add.image(x, 360 / 2, item).setScale(0.1);
      image.setInteractive({ useHandCursor: true });
      image.on('pointerdown', () => this.changeItem(currentCategory, item));
      if (index > 2) {
        image.setPosition(x - 240, 580 / 2);
      }
      this.currentImages.push(image);
    });
  }

  changeItem(category, item) {
    switch (category) {
      case 'clothes':
        this.image1.setTexture(item);
        break;
      case 'HAIR':
        this.cha3r.setTexture(item);
        break;
      case 'miniDra':
        this.miniDara.setTexture(item);
        break;
      case 'sbabt':
        this.sabat.setTexture(item);
        break;
    }
    this.cute.play();
    this.saveCharacterState();
  }

  saveCharacterState() {
    const characterState = {
      miniDara: this.miniDara.texture.key,
      clothes: this.image1.texture.key,
      hair: this.cha3r.texture.key,
      shoes: this.sabat.texture.key,
    };
    localStorage.setItem('characterState', JSON.stringify(characterState));
  }

  loadCharacterState() {
    const characterState = JSON.parse(localStorage.getItem('characterState'));
    if (characterState) {
      this.miniDara.setTexture(characterState.miniDara);
      this.image1.setTexture(characterState.clothes);
      this.cha3r.setTexture(characterState.hair);
      this.sabat.setTexture(characterState.shoes);
    }
  }

  clickRight() {
    this.fin = (this.fin + 1) % this.swith.length;
    this.updateImages();
    this.clickeff.play();
  }

  clickLeft() {
    this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
    this.updateImages();
    this.clickeff.play();
  }

  valider() {
    if (this.room1) {
      this.room1.destroy();
      this.valide.destroy();
    }

    this.bgStage = this.add.image(420, 250, 'bgStage').setScale(0.44);

    this.add.image(1200 / 2, 620 / 2, 'caracter').setScale(0.32);
    this.sabat = this.add.image(1202 / 2, 934 / 2).setScale(0.37);
    this.miniDara = this.add.image(1199 / 2, 350 / 2).setScale(0.315);
    this.image1 = this.add.image(1200 / 2, 673 / 2).setScale(0.325);
    this.cha3r = this.add.image(1190 / 2, 490 / 2).setScale(0.35);

    this.loadCharacterState();

    for (let index = 1; index <= 8; index++) {
      let x = 100 * index;
      this.stage = this.add.image(x + 180, 200, 'stage' + index).setScale(0.4);
      this.imageStage = this.add.image(560 / 2, 405 / 2, 'caracter').setScale(0.08);
      if (this.stage.texture.key === 'stage' + this.stagenum) {
        this.stage.setInteractive({ useHandCursor: true });
        this.stage.setTexture('stage1');
        this.stage.on('pointerdown', () => this.validSt());
      }
      if (index > 4) {
        this.stage.setPosition(x - 220, 780 / 2);
      }
    }

    this.stagenum += 1;
  }

  validSt() {
    this.bgStage.setVisible(false);
    this.room1 = this.add.image(800 / 2, 500 / 2, 'room1').setScale(0.45);

    this.add.image(1200 / 2, 620 / 2, 'caracter').setScale(0.32);
    this.sabat = this.add.image(1202 / 2, 934 / 2).setScale(0.37);
    this.image1 = this.add.image(1200 / 2, 673 / 2).setScale(0.325);
    this.miniDara = this.add.image(1199 / 2, 350 / 2).setScale(0.315);
    this.cha3r = this.add.image(1191 / 2, 493 / 2).setScale(0.35);

    this.loadCharacterState();

    this.flish_right = this.add.image(573 / 2, 810 / 2, 'flish-right').setScale(0.5);
    this.flish_right.setInteractive({ useHandCursor: true });
    this.flish_right.on('pointerdown', () => this.clickRight());

    this.flish_left = this.add.image(453 / 2, 810 / 2, 'flish-left').setScale(0.5);
    this.flish_left.setInteractive({ useHandCursor: true });
    this.flish_left.on('pointerdown', () => this.clickLeft());

    this.updateImages();

    this.meut = this.add.image(750, 50, 'nomeut').setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(750, 50, 'music').setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(750, 50, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    this.clickeff = this.sound.add('clickeff');
    this.cute = this.sound.add('cute');

    this.valide = this.add.image(90, 425, 'valide').setScale(0.5);
    this.valide.setInteractive({ useHandCursor: true });
    this.valide.on('pointerdown', () => this.valider());
  }

  parametreGame() {
    this.clickeff.play();
    this.tweens.add({
      targets: this.parametre,
      angle: 180,
      duration: 300,
      ease: 'Linear',
      yoyo: true,
    });

    if (this.click === 1) {
      this.tweens.add({
        targets: this.meut,
        y: 50,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 50,
            duration: 500,
          });
        }
      });
      this.click = 2;
    } else if (this.click === 2) {
      this.music.setScale(1);
      this.meut.setScale(0.035);
      this.tweens.add({
        targets: this.meut,
        y: 105,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 150,
            duration: 500,
          });
        }
      });
      this.click = 1;
    }
  }

  clickMeut() {
    if (this.m === 'nomeut') {
      this.meut.setTexture('meut').setScale(1);
      this.m = 'meut';
    } else if (this.m === 'meut') {
      this.meut.setTexture('nomeut').setScale(0.035);
      this.m = 'nomeut';
    }
  }

  clickMusic() {
    if (this.x === 'music') {
      this.music.setTexture('nomusic');
      this.x = 'nomusic';
      this.clickeff.setMute(true);
      this.cute.setMute(true);
    } else if (this.x === 'nomusic') {
      this.music.setTexture('music');
      this.x = 'music';
      this.clickeff.setMute(false);
      this.cute.setMute(false);
    }
  }
}


game.scene.add('Malabis', Malabis);
game.scene.add('startGame', startGame);
game.scene.add('LoadingScene',LoadingScene)
game.scene.start('startGame');



