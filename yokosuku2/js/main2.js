enchant();



window.onload = function() {
   

    var game = new Game(320, 320);
    game.fps = 24;
    game.preload('chara1.png', 'gameover.png', 'jump.wav', 'gameover.wav','bg1.png','bg2.png','igaguri.png','start.png','kuma.png','Ball3.png','map1.png');
    game.onload = function() {
       
      var map = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth);
  map.image = game.assets[tiled[0].image];
  map.loadData.apply(map, tiled[0].background);
  map.collisionData = tiled[0].collision;

  var foregroundMap = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth);
  foregroundMap.image = game.assets[tiled[0].image];
  foregroundMap.loadData.apply(foregroundMap, tiled[0].foreground);

       
    }
    game.start();
}
