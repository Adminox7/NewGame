class GameConfig {
  constructor() {
    this.m = 'nomeut';
    this.x = 'music';
    this.click = 2;
  }

  toggleMute() {
    if (this.m === 'nomeut') {
      this.m = 'meut';
    } else {
      this.m = 'nomeut';
    }
  }

  toggleMusic() {
    if (this.x === 'music') {
      this.x = 'nomusic';
    } else {
      this.x = 'music';
    }
  }
}

const gameConfig = new GameConfig();
class startGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
  }

  preload() {
    this.load.image('room', './assets/bg start.png');
    this.load.image('start', './assets/إلعب الآن.png');
    this.load.image('parametre', './assets/parametre.png');
    this.load.image('meut', './assets/meut.png');
    this.load.image('nomeut', './assets/nomeut.png');
    this.load.image('music', './assets/music.png');
    this.load.image('nomusic', './assets/nomusic.png');
    this.load.image('miniLatifa', './assets/loading/miniLatifa.png');
    this.load.image('fullscreen', './assets/fullScreen.png');
  }

  create() {
    this.add.image(1920 / 2, 1080 / 2, 'room');

    this.start = this.add.image(950, 965, 'start');
    this.start.setInteractive({ useHandCursor: true });
    this.start.on('pointerdown', () => this.startGame());

    this.meut = this.add.image(1800, 80, gameConfig.m).setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(1800, 80, gameConfig.x).setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1);
    this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
        if (this.scale.isFullscreen === false) {
            this.scale.startFullscreen();
            this.scale.canvas.style.width = '100%';
            this.scale.canvas.style.height = '100vh';
            this.scale.canvas.style.borderRadius = '0px';
            this.scale.canvas.style.marginTop = '0vh';
            this.scale.canvas.style.marginLeft = '0%';
        } else {
            this.scale.stopFullscreen();
            this.scale.canvas.style.width = '';
            this.scale.canvas.style.height = '';
            this.scale.canvas.style.borderRadius = '';
            this.scale.canvas.style.marginTop = '';
            this.scale.canvas.style.marginLeft = '';
        }
    });
  }

  update() {}

  startGame() {
    this.scene.start('LoadingScene');
  }

  parametreGame() {
    this.tweens.add({
      targets: this.parametre,
      angle: 180,
      duration: 300,
      ease: 'Linear',
      yoyo: true,
    });

    if (gameConfig.click === 1) {
      this.tweens.add({
        targets: this.meut,
        y: 80,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 80,
            duration: 500,
          });
        }
      });
      gameConfig.click = 2;
    } else if (gameConfig.click === 2) {
      this.music.setScale(0.25);
      this.meut.setScale(0.25);
      this.tweens.add({
        targets: this.meut,
        y: 160,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 230,
            duration: 500,
          });
        }
      });
      gameConfig.click = 1;
    }
  }

  clickMeut() {
    gameConfig.toggleMute();
    this.meut.setTexture(gameConfig.m).setScale(0.25);
  }

  clickMusic() {
    gameConfig.toggleMusic();
    this.music.setTexture(gameConfig.x);
  }
}

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const miniLatifa = this.add.image(width / 2 - 150, height / 2.18, 'miniLatifa').setScale(0.5);

    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 165, height / 2, 330, 50);
    progressBox.lineStyle(4, 0xffffff, 1);
    progressBox.strokeRect(width / 2 - 165, height / 2, 330, 50);

    let progressBar = this.add.graphics();

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 30,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: loadingText,
      alpha: { from: 0, to: 1 },
      duration: 500,
      repeat: -1,
      yoyo: true
    });

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
      miniLatifa.x = width / 2 - 150 + 300 * value;
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    this.load.image('miniLatifa', './assets/1x/miniLatifa.png');
    this.load.image('room1', './assets/room.png');
    this.load.image('flish-left', './assets/flish-left.png');
    this.load.image('flish-right', './assets/flish-right.png');
    this.load.image('caracter', './assets/1x/latifa.png');
    this.load.image('parametre', './assets/parametre.png');
    this.load.image('meut', './assets/meut.png');
    this.load.image('nomeut', './assets/nomeut.png');
    this.load.image('music', './assets/music.png');
    this.load.image('nomusic', './assets/nomusic.png');
    this.load.image('valide', './assets/valide.png');
    this.load.image('bgStage', './assets/bgMalabis.png');
    this.load.image('hida2', './assets/حـذاء.png');
    this.load.image('khimar', './assets/خمــار.png');
    this.load.image('ghita2', './assets/غطاء الرأس.png');
    this.load.image('fostan', './assets/فسـتا ن.png');

    for (let i = 1; i <= 6; i++) {
      this.load.image(`HAIR${i}`, `./assets/1x/dra${i}.png`);
    }
    for (let i = 1; i <= 6; i++) {
      this.load.image(`clothes${i}`, `./assets/1x/labsa${i}.png`);
    }
    for (let i = 1; i <= 6; i++) {
      this.load.image(`shoes${i}`, `./assets/1x/sabat${i}.png`);
    }
    for (let i = 0; i <= 5; i++) {
      this.load.image(`shose${i}`, `./assets/1x/photo sbabt/shose${i}.png`);
    }
    for (let i = 1; i <= 6; i++) {
      this.load.image(`miniDra${i}`, `./assets/1x/miniDra${i}.png`);
    }
    for (let i = 1; i <= 8; i++) {
      this.load.image(`stage${i}`, `./assets/stage/stage${i}.png`);
    }
    for (let i = 1; i <= 4; i++) {
      this.load.image(`shipe${i}`, `./assets/shipe${i}.png`);
    }
  }

  create() {
    this.scene.start('Malabis');
  }
}

class Malabis extends Phaser.Scene {
  constructor() {
    super({ key: 'Malabis' });
    this.chose = {
      clothes: ['clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6'],
      sbabt: ['shoes1', 'shoes2', 'shoes3','shoes4', 'shoes5', 'shoes6'],
      miniDra:['miniDra1','miniDra2','miniDra3','miniDra4','miniDra5','miniDra6'],
      HAIR:['HAIR1','HAIR2','HAIR3','HAIR4','HAIR5','HAIR6'],
    }
    this.swith = ['miniDra','clothes','HAIR', 'sbabt' ];
    this.fin = 0;
    this.currentImages = [];
    this.stagenum = 1;
    this.store = {
      miniDra:[],
      clothes:[],
      HAIR:[],
      sbabt:[]
    }
    this.selectedStage = '';
    this.check = 0;
    this.selectionMade = {
      miniDra: false,
      clothes: false,
      HAIR: false,
      sbabt: false
    };
    this.clickLeftCounters = {
      clothes: 0,
      HAIR: 0,
      sbabt: 0
    };
    this.checkAnawin = 1;
    this.ma3raftch = 0;
  }

  preload() {}

  create() {
    this.valider();
  }

  updateImages() {
    this.currentImages.forEach(image => image.destroy());
    this.currentImages = [];
    switch (this.swith[this.fin]) {
      case 'miniDra':
        for (let index = 0; index < this.chose.miniDra.length; index++) {
          var x = 234 + (index * 200);
          let image = this.add.image(x + 200, 392, this.chose.miniDra[index]);
          image.setInteractive({ useHandCursor: true });
          image.on('pointerdown', () => this.ChangeminiDra(this.chose.miniDra[index]));
          if (index > 2) {
            image.setPosition(x - 400, 650);
          }
          this.currentImages.push(image);
        }
        break;
      case 'clothes':
        this.checkAnawin = 2;
        for (let index = 0; index < this.chose.clothes.length; index++) {
          var x = 443.50 + (index * 200);
          let image = this.add.image(x, 380.50, this.chose.clothes[index]).setScale(0.3);
          image.setInteractive({ useHandCursor: true });
          image.on('pointerdown', () => this.ChangeClothes(this.chose.clothes[index]));
          if (index > 2) {
            image.setPosition(x - 603.50, 631.50);
          }
          this.currentImages.push(image);
        }
        break;
      case 'sbabt':
        this.checkAnawin = 4;
        for (let index = 0; index < this.chose.sbabt.length; index++) {
          var x = 443.50 + (index * 200);
          let image = this.add.image(x, 380.50, 'shose' + index);
          image.setInteractive({ useHandCursor: true });
          image.on('pointerdown', () => this.ChangeShoes(this.chose.sbabt[index]));
          if (index > 2) {
            image.setPosition(x - 603.50, 631.50);
          }
          this.currentImages.push(image);
        }
        break;
      case 'HAIR':
        this.checkAnawin = 3;
        for (let index = 0; index < this.chose.HAIR.length; index++) {
          var x = 443.50 + (index * 200);
          let image = this.add.image(x, 370.50, this.chose.HAIR[index]).setScale(0.5);
          image.setInteractive({ useHandCursor: true });
          image.on('pointerdown', () => this.ChangeHair(this.chose.HAIR[index]));
          if (index > 2) {
            image.setPosition(x - 603.50, 630.50);
          }
          this.currentImages.push(image);
        }
        break;
      default:
        console.error("Unknown category in swith: ", this.swith[this.fin]);
        break;
    }
  }

  clickRight() {
    if (this.selectionMade[this.swith[this.fin]] && this.ma3raftch == 0) {
      this.fin = (this.fin + 1) % this.swith.length;
      this.updateImages();
    } else if (this.check == 0) {
      const shipeImage = this.add.image(1652, 276, 'shipe1');
      this.time.delayedCall(2500, () => {
        shipeImage.destroy();
      });
    } else if (this.check == 1) {
      const shipeImage = this.add.image(1652, 276, 'shipe2');
      this.time.delayedCall(2500, () => {
        shipeImage.destroy();
      });
    } else if (this.check == 2) {
      const shipeImage = this.add.image(1652, 276, 'shipe3');
      this.time.delayedCall(2500, () => {
        shipeImage.destroy();
      });
    } else if (this.check == 3) {
      const shipeImage = this.add.image(1652, 276, 'shipe4');
      this.time.delayedCall(2500, () => {
        shipeImage.destroy();
      });
    }
  }

  clickLeft() {
    const currentCategory = this.swith[this.fin];
    if (currentCategory === 'clothes' && this.clickLeftCounters.clothes < 1) {
      this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
      this.clickLeftCounters.clothes++;
    } else if (currentCategory === 'HAIR' && this.clickLeftCounters.HAIR < 2) {
      this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
      this.clickLeftCounters.HAIR = 2;
    } else if (currentCategory === 'sbabt') {
      this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
    } else {
      console.log("Select an item from the current category first or move through categories in the defined order.");
      return;
    }
    this.updateImages();
  }

  ChangeminiDra(miniDra) {
    if (miniDra) {
      this.miniDara.setTexture(miniDra);
      this.check = 1;
      this.selectionMade.miniDra = true;
    }
  }

  ChangeClothes(clothes) {
    this.image1.setTexture(clothes);
    this.check = 2;
    this.selectionMade.clothes = true;
  }

  ChangeHair(hair) {
    this.cha3r.setTexture(hair);
    this.check = 3;
    this.selectionMade.HAIR = true;
  }

  ChangeShoes(sho) {
    this.sabat.setTexture(sho);
    this.check = 4;
    this.selectionMade.sbabt = true;
    this.valide.on('pointerdown', () => this.valider());
  }

  valider() {
    this.fin = 0;
    this.updateImages();
    this.selectionMade = {
      miniDra: false,
      clothes: false,
      HAIR: false,
      sbabt: false
    };
    this.check = 0;
    if (this.room1) {
      this.room1.destroy();
      this.valide.destroy();
    }
    this.bgStage = this.add.image(1920 / 2, 1080 / 2, 'bgStage');
    if (this.stagenum == this.selectedStage.slice(-1)) {
      this.stagenum += 1;
    }
    for (let index = 1; index <= 8; index++) {
      let x = 237 * index;
      this.stage = this.add.image(x + 360, 449, 'stage' + index);
      if (this.stage.texture.key === 'stage' + this.stagenum) {
        this.stage.setInteractive({ useHandCursor: true });
        this.stage.setTexture('stage1');
        this.stage.on('pointerdown', () => this.validSt('stage' + index));
      }
      if (index > 4) {
        this.stage.setPosition(x - 579, 865, 50);
      }
    }
    if (this.stagenum >= 2) {
      if (this.stagenum == this.selectedStage.slice(-1)) {
        this.store.miniDra.push(this.miniDara.texture.key);
        this.store.clothes.push(this.image1.texture.key);
        this.store.HAIR.push(this.cha3r.texture.key);
        this.store.sbabt.push(this.sabat.texture.key);
        this.ma3raftch = 1;
      } else {
        this.store.miniDra[this.selectedStage.slice(-1) - 1] = this.miniDara.texture.key;
        this.store.clothes[this.selectedStage.slice(-1) - 1] = this.image1.texture.key;
        this.store.HAIR[this.selectedStage.slice(-1) - 1] = this.cha3r.texture.key;
        this.store.sbabt[this.selectedStage.slice(-1) - 1] = this.sabat.texture.key;
      }
      for (let index = 0; index < this.store.miniDra.length; index++) {
        let x = 603 + (index * 235);
        let image = this.add.image(x, 359.5, this.store.miniDra[index]).setScale(0.32);
        if (index > 3) {
          image.setPosition(x - 940, 776.5);
        }
      }
      for (let index = 0; index < this.store.clothes.length; index++) {
        let x = 603 + (index * 235);
        let image = this.add.image(x, 465, this.store.clothes[index]).setScale(0.3);
        if (index > 3) {
          image.setPosition(x - 940, 882);
        }
      }
      for (let index = 0; index < this.store.HAIR.length; index++) {
        let x = 599.50 + (index * 235);
        let image = this.add.image(x, 405.50 , this.store.HAIR[index]).setScale(0.32);
        if (index > 3) {
          image.setPosition(x - 940, 822.50);
        }
      }
      for (let index = 0; index < this.store.sbabt.length; index++) {
        let x = 603.50 + (index * 235);
        let image = this.add.image(x, 555.50, this.store.sbabt[index]).setScale(0.4);
        if (index > 3) {
          image.setPosition(x - 940, 972.50);
        }
      }
    }
    this.meut = this.add.image(1800, 80, gameConfig.m).setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(1800, 80, gameConfig.x).setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1);
    this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
        if (this.scale.isFullscreen === false) {
            this.scale.startFullscreen();
            this.scale.canvas.style.width = '100%';
            this.scale.canvas.style.height = '100vh';
            this.scale.canvas.style.borderRadius = '0px';
            this.scale.canvas.style.marginTop = '0vh';
            this.scale.canvas.style.marginLeft = '0%';
        } else {
            this.scale.stopFullscreen();
            this.scale.canvas.style.width = '';
            this.scale.canvas.style.height = '';
            this.scale.canvas.style.borderRadius = '';
            this.scale.canvas.style.marginTop = '';
            this.scale.canvas.style.marginLeft = '';
        }
    });
  }

  validSt(stageName) {
    this.selectedStage = stageName;
    this.bgStage.setVisible(false);
    this.stage.setInteractive({ useHandCursor: false });
    this.room1 = this.add.image(1920 / 2, 1080 / 2, 'room1');
    this.add.image(2823/ 2, 1314 / 2, 'caracter');
    this.sabat = this.add.image(1414.50, 1021.50);
    this.image1 = this.add.image(1411.50, 717.50);
    this.miniDara = this.add.image(1411.50, 345);
    this.cha3r = this.add.image(1402, 491.50);
    this.anawin = this.add.image(643.75, 204.42);

    if (this.stagenum > parseInt(this.selectedStage.slice(-1))) {
      this.sabat = this.add.image(1414.50, 1021.50, this.store.sbabt[this.selectedStage.slice(-1) - 1]);
      this.image1 = this.add.image(1411.50, 717.50, this.store.clothes[this.selectedStage.slice(-1) - 1]);
      this.miniDara = this.add.image(1411.50, 345, this.store.miniDra[this.selectedStage.slice(-1) - 1]);
      this.cha3r = this.add.image(1402, 491.50, this.store.HAIR[this.selectedStage.slice(-1) - 1]);
    }

    this.flish_right = this.add.image(680, 880, 'flish-right');
    this.flish_right.setInteractive({ useHandCursor: true });
    this.flish_right.on('pointerdown', () => this.clickRight());

    this.flish_left = this.add.image(560, 880, 'flish-left');
    this.flish_left.setInteractive({ useHandCursor: true });
    this.flish_left.on('pointerdown', () => this.clickLeft());

    this.updateImages();

    this.meut = this.add.image(1800, 80, gameConfig.m).setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(1800, 80, gameConfig.x).setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1);
    this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
        if (this.scale.isFullscreen === false) {
            this.scale.startFullscreen();
            this.scale.canvas.style.width = '100%';
            this.scale.canvas.style.height = '100vh';
            this.scale.canvas.style.borderRadius = '0px';
            this.scale.canvas.style.marginTop = '0vh';
            this.scale.canvas.style.marginLeft = '0%';
        } else {
            this.scale.stopFullscreen();
            this.scale.canvas.style.width = '';
            this.scale.canvas.style.height = '';
            this.scale.canvas.style.borderRadius = '';
            this.scale.canvas.style.marginTop = '';
            this.scale.canvas.style.marginLeft = '';
        }
    });

    this.valide = this.add.image(270, 930, 'valide');
    this.valide.setInteractive({ useHandCursor: true });

    if (this.stagenum > parseInt(this.selectedStage.slice(-1)[0])) {
      this.valide.on('pointerdown', () => this.valider());
    }
  }

  parametreGame() {
    this.tweens.add({
      targets: this.parametre,
      angle: 180,
      duration: 300,
      ease: 'Linear',
      yoyo: true,
    });

    if (gameConfig.click === 1) {
      this.tweens.add({
        targets: this.meut,
        y: 80,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 80,
            duration: 500,
          });
        }
      });
      gameConfig.click = 2;
    } else if (gameConfig.click === 2) {
      this.music.setScale(0.25);
      this.meut.setScale(0.25);
      this.tweens.add({
        targets: this.meut,
        y: 160,
        duration: 500,
        onComplete: () => {
          this.tweens.add({
            targets: this.music,
            y: 230,
            duration: 500,
          });
        }
      });
      gameConfig.click = 1;
    }
  }

  clickMeut() {
    gameConfig.toggleMute();
    this.meut.setTexture(gameConfig.m).setScale(0.25);
  }

  clickMusic() {
    gameConfig.toggleMusic();
    this.music.setTexture(gameConfig.x);
  }

  update() {
    if (this.checkAnawin == 1 && this.anawin) {
      this.anawin.setTexture('ghita2');
    }
    if (this.checkAnawin == 2 && this.anawin) {
      this.anawin.setTexture('fostan');
    }
    if (this.checkAnawin == 3 && this.anawin) {
      this.anawin.setTexture('khimar');
    }
    if (this.checkAnawin == 4 && this.anawin) {
      this.anawin.setTexture('hida2');
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: 0xffffff,
};

const game = new Phaser.Game(config);

game.scene.add('startGame', startGame);
game.scene.add('LoadingScene', LoadingScene);
game.scene.add('Malabis', Malabis);
game.scene.start('startGame');
