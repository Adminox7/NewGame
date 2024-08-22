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
    this.load.image('miniLatifa', './assets/loading/miniLatifa.png');
    this.load.image('fullscreen', './assets/fullScreen.png');
  }

  create() {
    this.add.image(1920 / 2, 1080 / 2, 'room');

    this.start = this.add.image(950, 965, 'start');
    this.start.setInteractive({ useHandCursor: true });
    this.start.on('pointerdown', () => this.startGame());

    this.meut = this.add.image(1800, 80, 'nomeut').setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(1800, 80, 'music').setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

    // Ajout du bouton plein écran
    this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1);
    this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
        if (this.scale.isFullscreen === false) {
            this.scale.startFullscreen();
            this.scale.canvas.style.width = '100%';
            this.scale.canvas.style.height = '100vh';
            this.scale.canvas.style.borderRadius = '0px'; // Correction de 'border.raduis' à 'borderRadius'
            this.scale.canvas.style.marginTop = '0vh'; // Correction de 'margin.top' à 'marginTop'
            this.scale.canvas.style.marginLeft = '0%'; // Correction de 'margin.left' à 'marginLeft'
        } else {
            this.scale.stopFullscreen();
            this.scale.canvas.style.width = ''; // Réinitialiser à la valeur par défaut
            this.scale.canvas.style.height = ''; // Réinitialiser à la valeur par défaut
            this.scale.canvas.style.borderRadius = ''; // Réinitialiser à la valeur par défaut
            this.scale.canvas.style.marginTop = ''; // Réinitialiser à la valeur par défaut
            this.scale.canvas.style.marginLeft = ''; // Réinitialiser à la valeur par défaut
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

    if (this.click === 1) {
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
      this.click = 2;
    } else if (this.click === 2) {
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
      this.click = 1;
    }
  }

  clickMeut() {
    if (this.m === 'nomeut') {
      this.meut.setTexture('meut').setScale(0.25);
      this.m = 'meut';
    } else if (this.m === 'meut') {
      this.meut.setTexture('nomeut').setScale(0.25);
      this.m = 'nomeut';
    }
  }

  clickMusic() {
    if (this.x === 'music') {
      this.music.setTexture('nomusic');
      this.x = 'nomusic';
    } else if (this.x === 'nomusic') {
      this.music.setTexture('music');
      this.x = 'music';
    }
  }
}



class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    // Display the loading image
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'miniLatifa').setScale(0.5);

    // Create a progress box with a border
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.cameras.main.width / 2 - 165, this.cameras.main.height / 2, 330, 50);
    progressBox.lineStyle(4, 0xffffff, 1);
    progressBox.strokeRect(this.cameras.main.width / 2 - 165, this.cameras.main.height / 2, 330, 50);

    // Create a progress bar
    let progressBar = this.add.graphics();

    // Add loading text with animation
    let loadingText = this.make.text({
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2 - 30,
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

    // Update the progress bar
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.cameras.main.width / 2 - 150, this.cameras.main.height / 2 + 10, 300 * value, 30);
    });

    // Clean up once the loading is complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load necessary assets for the game
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

    // Load hair assets
    for (let i = 1; i <= 6; i++) {
      this.load.image(`HAIR${i}`, `./assets/1x/dra${i}.png`);
    }

    // Load clothes assets
    for (let i = 1; i <= 6; i++) {
      this.load.image(`clothes${i}`, `./assets/1x/labsa${i}.png`);
    }

    // Load shoes assets
    for (let i = 1; i <= 6; i++) {
      this.load.image(`shoes${i}`, `./assets/1x/sabat${i}.png`);
    }

    // Load miniDara assets
    for (let i = 1; i <= 6; i++) {
      this.load.image(`miniDra${i}`, `./assets/1x/miniDra${i}.png`);
    }

    // Load stage assets
    for (let i = 1; i <= 8; i++) {
      this.load.image(`stage${i}`, `./assets/stage/stage${i}.png`);
    }
  }

  create() {
    // Transition to the main scene once assets are loaded
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
    // Références aux images actuelles
    this.currentImages = [];
    this.m = 'nomeut';
    this.x = 'music';
    this.click = 2;
    this.stagenum = 0;
    this.store = {
      miniDra:[],
      clothes:[],
      HAIR:[],
      sbabt:[]
    }


  }

  preload() {
  
  }

  create() {
    // console.log(this.store['miniDra'][1])
    this.valider()
   
  }

  updateImages() {
    // Détruire les images actuelles
    this.currentImages.forEach(image => image.destroy());
    this.currentImages = [];

    if (this.swith[this.fin] === 'clothes') {
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
    }
    if (this.swith[this.fin] === 'sbabt') {
      for (let index = 0; index < this.chose.sbabt.length; index++) {
        var x = 443.50  + (index *200);
        let image = this.add.image(x, 380.50, this.chose.sbabt[index]);
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => this.ChangeShoes(this.chose.sbabt[index]));
        if (index > 2) {
          image.setPosition(x - 603.50, 631.50);
        }
        this.currentImages.push(image);
      }
    }
    if (this.swith[this.fin] === 'miniDra') {
      for (let index = 0; index < this.chose.miniDra.length; index++) {
        var x = 234 + (index * 200);
        let image = this.add.image(x+200, 392, this.chose.miniDra[index]);
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => this.ChangeminiDra(this.chose.miniDra[index]));
        if (index > 2) {
          image.setPosition(x - 400, 650);
        }
        this.currentImages.push(image);
      }
    }
    if (this.swith[this.fin] === 'HAIR') {
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
    }
  }

  clickRight() {
    this.fin = (this.fin + 1) % this.swith.length;
    this.updateImages();
    // this.clickeff.play();
  }

  clickLeft() {
    this.fin = (this.fin - 1 + this.swith.length) % this.swith.length;
    this.updateImages();
    // this.clickeff.play();
  }

  ChangeClothes(clothes) {

      this.image1.setTexture(clothes);
    // this.cute.play();
    
  }

  ChangeHair(hair) {
    this.cha3r.setTexture(hair);
    // this.cute.play();
  }
  
  ChangeminiDra(miniDra) {
    if(miniDra){
      this.miniDara.setTexture(miniDra);
    }
  
      
    // this.cute.play();
  }

  ChangeShoes(sho) {
    this.sabat.setTexture(sho);

    // this.cute.play();
  }


  valider() {

    if (this.room1) {
      this.room1.destroy();
      this.valide.destroy();
    }
    // Afficher l'image de fond du stage
   this.bgStage = this.add.image(1920 / 2, 1080 / 2, 'bgStage');
     // Mise à jour du stage
     this.stagenum += 1;
     for (let index = 1; index <= 8; index++) {
      let x = 237 * index;
      
      this.stage = this.add.image(x+360, 449, 'stage' + index);
      // this.imageStage=this.add.image(560 / 2, 405 / 2, 'caracter').setScale(0.08);

      if (this.stage.texture.key === 'stage' + this.stagenum) {
        this.stage.setInteractive({ useHandCursor: true });
        this.stage.setTexture('stage1');
        this.stage.on('pointerdown', () => this.validSt());
    }
      if (index > 4) {
        this.stage.setPosition(x - 579, 865,50);
      }  
      

  }
     if ( this.stagenum >=2) {
      
      // Stocker l'état actuel du personnage dans `this.store`
   this.store.miniDra.push(this.miniDara.texture.key);
   this.store.clothes.push(this.image1.texture.key);
   this.store.HAIR.push(this.cha3r.texture.key);
   this.store.sbabt.push(this.sabat.texture.key);

  for (let index = 0; index < this.store.miniDra.length; index++) {
    let x = 603 + (index * 250);
    let image = this.add.image(x, 371.50, this.store.miniDra[index]).setScale(0.3);
    if (index > 3) {
      image.setPosition(x - 940, 771.50);
    }
  } 
  for (let index = 0; index < this.store.clothes.length; index++) {
    let x = 603 + (index * 250);
    let image = this.add.image(x, 465, this.store.clothes[index]).setScale(0.3);
    if (index > 3) {
      image.setPosition(x - 940, 865);
    }
  } 
  for (let index = 0; index < this.store.HAIR.length; index++) {
    let x = 599.50 + (index * 250);
    let image = this.add.image(x, 412.50 , this.store.HAIR[index]).setScale(0.35);
    if (index > 3) {
      image.setPosition(x - 940,812.50);
    }
  } 
  for (let index = 0; index < this.store.sbabt.length; index++) {
    let x = 603.50  + (index * 250);
    let image = this.add.image(x, 510.50, this.store.sbabt[index]).setScale(0.4);
    if (index > 3) {
      image.setPosition(x - 940, 910.50);
    }
  }
}


this.meut = this.add.image(1800, 80, 'nomeut').setScale(0);
this.meut.setInteractive({ useHandCursor: true });
this.meut.on('pointerdown', () => this.clickMeut());

this.music = this.add.image(1800, 80, 'music').setScale(0);
this.music.setInteractive({ useHandCursor: true });
this.music.on('pointerdown', () => this.clickMusic());

this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
this.parametre.setInteractive({ useHandCursor: true });
this.parametre.on('pointerdown', () => this.parametreGame());
this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1)
this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown",function() {
  if(this.scene.scale.isFullscreen==false) {
      this.scene.scale.startFullscreen();
  }
  else {
      this.scene.scale.stopFullscreen();
  }
  
 })
}

  validSt (){
    this.bgStage.setVisible(false);
    this.stage.setInteractive({ useHandCursor: false });
    this.room1 = this.add.image(1920 / 2, 1080 / 2, 'room1');
    // this.vit = this.add.image(600 / 2, 600 / 2, 'vitrine').setScale(0.9);
    // this.vit.skew = 45;

    this.add.image(2823/ 2, 1314 / 2, 'caracter');

   // Initialize the images for clothes, hair, and shoes
   this.sabat = this.add.image(1414.50, 1021.50, );
   this.image1 = this.add.image(1411.50, 717.50, );
   this.miniDara = this.add.image(1411.50 , 345,);
   this.cha3r = this.add.image(1402 , 491.50, );


    //action flish
    this.flish_right = this.add.image(680, 880, 'flish-right');
    this.flish_right.setInteractive({ useHandCursor: true });
    this.flish_right.on('pointerdown', () => this.clickRight());

    this.flish_left = this.add.image(560, 880, 'flish-left');
    this.flish_left.setInteractive({ useHandCursor: true });
    this.flish_left.on('pointerdown', () => this.clickLeft());

    // Initial load of images
    this.updateImages();

    this.meut = this.add.image(1800, 80, 'nomeut').setScale(0);
    this.meut.setInteractive({ useHandCursor: true });
    this.meut.on('pointerdown', () => this.clickMeut());

    this.music = this.add.image(1800, 80, 'music').setScale(0);
    this.music.setInteractive({ useHandCursor: true });
    this.music.on('pointerdown', () => this.clickMusic());

    this.parametre = this.add.image(1800, 80, 'parametre').setScale(1);
    this.parametre.setInteractive({ useHandCursor: true });
    this.parametre.on('pointerdown', () => this.parametreGame());

this.fullscreenButton = this.add.image(80, 80, 'fullscreen').setScale(0.1)
this.fullscreenButton.setInteractive({ useHandCursor: true }).on("pointerdown",function() {
  if(this.scene.scale.isFullscreen==false) {
      this.scene.scale.startFullscreen();
  }
  else {
      this.scene.scale.stopFullscreen();
  }
  
 })

    // this.clickeff = this.sound.add('clickeff');
    // this.cute = this.sound.add('cute')

    this.valide = this.add.image(270,930,'valide');
    this.valide.setInteractive({useHandCursor:true})
    this.valide.on('pointerdown', () => this.valider());

       
    
  }


  parametreGame() {
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
      this.click = 2;
    } else if (this.click === 2) {
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
      this.click = 1;
    }
  }

  clickMeut() {
    if (this.m === 'nomeut') {
      this.meut.setTexture('meut').setScale(0.25);
      this.m = 'meut';
    } else if (this.m === 'meut') {
      this.meut.setTexture('nomeut').setScale(0.25);
      this.m = 'nomeut';
    }
  }

  clickMusic() {
    if (this.x === 'music') {
      this.music.setTexture('nomusic');
      this.x = 'nomusic';
    } else if (this.x === 'nomusic') {
      this.music.setTexture('music');
      this.x = 'music';
    }
  }
}

game.scene.add('Malabis', Malabis);
game.scene.add('startGame', startGame);
game.scene.add('LoadingScene',LoadingScene);
game.scene.start('startGame');


