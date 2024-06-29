const config = {
  type: Phaser.AUTO,
  width: 800,
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
    this.load.image('room', './assets/room.jpg');
    this.load.image('start', './assets/start.png');
    this.load.image('parametre', './assets/parametre.png');
    this.load.image('meut', './assets/meut.png');
    this.load.image('nomeut', './assets/nomeut.png');
    this.load.image('music', './assets/music.png');
    this.load.image('nomusic', './assets/nomusic.png');
    this.load.audio('clickeff', './assets/clickeff.wav');
  }

  create() {
    this.add.image(400, 250, 'room').setScale(0.24);

    this.start = this.add.image(225, 375, 'start').setScale(0.88);
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
    this.scene.start('Malabis');
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





class Malabis extends Phaser.Scene {
  constructor() {
    super({ key: 'Malabis' });
    this.chose = {
      clothes: ['clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6'],
      sbabt: ['shoes1', 'shoes2', 'shoes3','shoes4', 'shoes5', 'shoes6'],
      HAIR:['HAIR1','HAIR2','HAIR3','HAIR4','HAIR5','HAIR6'],
    }
    this.swith = ['clothes', 'sbabt' ,'HAIR'];
    this.fin = 0;

    // Références aux images actuelles
    this.currentImages = [];
  }

  preload() {
    this.load.image('room', './assets/room.jpg');
    this.load.image('vitrine', './assets/vitrine.png');
    this.load.image('flish-left', './assets/flish-left.png');
    this.load.image('flish-right', './assets/flish-right.png');
    this.load.image('caracter', './assets/1x/Fichier 1.png');

    // HAIR
    this.load.image('HAIR1', './assets/1x/HAIR 1.png');
    this.load.image('HAIR2', './assets/1x/HAIR 2.png');
    this.load.image('HAIR3', './assets/1x/HAIR 3.png');
    this.load.image('HAIR4', './assets/1x/HAIR 4.png');
    this.load.image('HAIR5', './assets/1x/HAIR 5.png');
    this.load.image('HAIR6', './assets/1x/HAIR 6.png');
    //clothes
    this.load.image('clothes1', './assets/1x/clothes 1.png');
    this.load.image('clothes2', './assets/1x/clothes 2.png');
    this.load.image('clothes3', './assets/1x/clothes 3.png');
    this.load.image('clothes4', './assets/1x/clothes 4.png');
    this.load.image('clothes5', './assets/1x/clothes 5.png');
    this.load.image('clothes6', './assets/1x/clothes 6.png');
    //shoes 
    this.load.image('shoes1', './assets/1x/shoes 1.png');
    this.load.image('shoes2', './assets/1x/shoes 2.png');
    this.load.image('shoes3', './assets/1x/shoes 3.png');
    this.load.image('shoes4', './assets/1x/shoes 4.png');
    this.load.image('shoes5', './assets/1x/shoes 5.png');
    this.load.image('shoes6', './assets/1x/shoes 6.png');
  }

  create() {
    this.add.image(800 / 2, 500 / 2, 'room').setScale(0.24);
    this.vit = this.add.image(600 / 2, 600 / 2, 'vitrine').setScale(0.9);
    this.vit.skew = 45;

    this.add.image(1100 / 2, 600 / 2, 'caracter').setScale(0.7);
    // clothes 
    this.image1 = this.add.image(1100 / 2, 624 / 2, 'clothes1').setScale(0.7);

   

    // HAIR
    this.cha3r = this.add.image(1110 / 2, 397 / 2, 'HAIR1').setScale(0.7);

    // shoes
    this.sabat = this.add.image(1132.5 / 2, 880 / 2, 'shoes1').setScale(0.7);

    //action flish
    this.flish_right = this.add.image(683 / 2, 932 / 2, 'flish-right');
    this.flish_right.setInteractive({ useHandCursor: true });
    this.flish_right.on('pointerdown', () => this.clickRight());

    this.flish_left = this.add.image(533 / 2, 940 / 2, 'flish-left');
    this.flish_left.setInteractive({ useHandCursor: true });
    this.flish_left.on('pointerdown', () => this.clickLeft());

    // Initial load of images
    this.updateImages();
  }

  updateImages() {
    // Détruire les images actuelles
    this.currentImages.forEach(image => image.destroy());
    this.currentImages = [];

    if (this.swith[this.fin] === 'clothes') {
      for (let index = 0; index < this.chose.clothes.length; index++) {
        var x = 440 / 2 + (index * 80);
        let image = this.add.image(x, 460 / 2, this.chose.clothes[index]).setScale(0.25);
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => this.ChangeClothes(this.chose.clothes[index]));
        if (index > 2) {
          image.setPosition(x - 240, 720 / 2);
        }
        this.currentImages.push(image);
      }
    }
    if (this.swith[this.fin] === 'sbabt') {
      for (let index = 0; index < this.chose.sbabt.length; index++) {
        var x = 440 / 2 + (index * 80);
        let image = this.add.image(x, 460 / 2, this.chose.sbabt[index]).setScale(0.4);
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => this.ChangeShoes(this.chose.sbabt[index]));
        if (index > 2) {
          image.setPosition(x - 240, 720 / 2);
        }
        this.currentImages.push(image);
      }
    }
    if (this.swith[this.fin] === 'HAIR') {
      for (let index = 0; index < this.chose.HAIR.length; index++) {
        var x = 440 / 2 + (index * 80);
        let image = this.add.image(x, 460 / 2, this.chose.HAIR[index]).setScale(0.4);
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => this.ChangeHair(this.chose.HAIR[index]));
        if (index > 2) {
          image.setPosition(x - 240, 720 / 2);
        }
        this.currentImages.push(image);
      }
    }
  }

  clickRight() {
    this.fin = (this.fin + 1) % this.swith.length;
    this.updateImages();
  }

  clickLeft() {
    this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
    this.updateImages();
  }

  ChangeClothes(clothes) {
    if(clothes =='clothes1'){
      this.image1.setTexture(clothes);
      this.image1.setPosition(1100/2,624/2);
    }if (clothes =='clothes2'  ) {
      this.image1.setTexture(clothes);
      this.image1.setPosition(1100/2,624/2);
    }if (clothes =='clothes3') {
      this.image1.setTexture(clothes);
      this.image1.setPosition(1103/2,615/2);
    }if (clothes =='clothes4') {
      this.image1.setTexture(clothes);
      this.image1.setPosition(1104/2,635/2);
    }if (clothes =='clothes5') {
      this.image1.setTexture(clothes);
      this.image1.setPosition(1101/2,622/2);
    }if (clothes =='clothes6') {
      this.image1.setTexture(clothes);
      this.image1.setPosition(1103/2,635/2);
    }    
  }

  ChangeHair(hair) {
    if (hair =='HAIR1') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1110 / 2, 397 / 2);
    } if (hair =='HAIR2') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1136 / 2, 385 / 2);
    }if (hair =='HAIR3') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1116 / 2, 364 / 2);
    }if (hair =='HAIR4') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1128.5 / 2, 364 / 2);
    } if (hair =='HAIR5') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1100.5 / 2, 385.5 / 2);
    }if (hair =='HAIR6') {
      this.cha3r.setTexture(hair);
      this.cha3r.setPosition(1107 / 2, 339.8 / 2);
    }
  }

  ChangeShoes(sho) {
    this.sabat.setTexture(sho);
    this.sabat.setPosition(1132.5 / 2, 880 / 2);
  }
}

game.scene.add('Malabis', Malabis);
game.scene.add('startGame', startGame);
game.scene.start('startGame');
