enchant();



window.onload = function() {
   

    var game = new Game(320, 320);
    game.fps = 24;
    game.keybind(32,'space');
    game.keybind(13,'enter');
    
    
    game.preload('chara1.png', 'gameover.png', 'jump.wav', 'gameover.wav','bg1.png','bg2.png','igaguri.png','start.png','kuma.png','Ball3.png','bigmonster1.gif','monster5.gif','bullet.png');
    game.onload = function() {
        
        

        var createStartScene=function(){
            var scene = new Scene();
            scene.backgroundColor='#DBDD6F';
           
            var startImage = new Sprite(236,48);
            startImage.image = game.assets['start.png'];

            startImage.x=42;
            startImage.y=136;
            scene.addChild(startImage);


            var kuma =new Sprite(160,32);
            kuma.image=game.assets['chara1.png'];
        
            kuma.x=80;
            kuma.y=100;

            scene.addChild(kuma);
            




            var title = new Label('くまの日常');
            title.width=320;
            title.textAlign='center';
            title.color='#965534';
            title.x=0;
            title.y=40;
            title.font='44px sans-serif';
            scene.addChild(title);

            var info1=new Label('STARTを押してPlay');
            info1.width=320;
            info1.textAlign='center';
            info1.color='#000000';
            info1.x=0;
            info1.y=230;
            info1.font='14px sans-serif';
            scene.addChild(info1);

            var info2=new Label('Spaceでジャンプ/Enterで攻撃');
            info2.width=320;
            info2.textAlign='center';
            info2.color='#000000';
            info2.x=0;
            info2.y=250;
            info2.font='14px sans-serif';
            scene.addChild(info2);
           
            startImage.addEventListener(Event.TOUCH_START,function(){
                game.replaceScene(GameScene());
            });
            return scene;
            

            };

            var GameScene=function(){
                var scroll=0;

                var groundline=250;
                var scrollspeed=8;
                

                var scene=new Scene();
                scene.backgroundColor='#87CEEB';

                var bg1=new Sprite(320,320);
                bg1.image=game.assets['bg1.png'];
                bg1.x=0;
                bg1.y=0;
                bg1.rotate(0);
                scene.addChild(bg1);

               

                var bg2=new Sprite(320,320);
                bg2.image=game.assets['bg2.png'];
                bg2.x=320;
                bg2.y=0;
                bg2.rotate(0);
                scene.addChild(bg2);

                

                var kuma=new Sprite(32,32);
                kuma.image=game.assets['chara1.png'];
                kuma.x=150;
                kuma.y=groundline-kuma.height;
                kuma.scaleX=1;
                kuma.scaleY=1;
                kuma.rotate(0);
                kuma.frame=4;
                kuma.onenterframe=function(){
                    var input=game.input;
                    if(input.space===true&& kuma.y===groundline-kuma.height){
                        kuma.tl.moveBy(0, -120, 12, enchant.Easing.CUBIC_EASEOUT) 
                           .moveBy(0, 120, 12, enchant.Easing.CUBIC_EASEIN); 
                           game.assets['jump.wav'].clone().play();

                       }
                     
                };

             
            
                scene.addChild(kuma);

                 var shoot=new Sprite(16,16);
                shoot.image=game.assets['bullet.png'];
                shoot.x=-shoot.width;
                shoot.y=kuma.y;
                shoot.onenterframe=function(){
                    var input=game.input;
                    if(input.enter===true){
                        shoot.x=kuma.x;
                        shoot.y=kuma.y;
                        


                    }
                    if(shoot.x===kuma.x){
                         shoot.tl.moveTo(320,shoot.y,6);
            
                        
                    }

                };
                scene.addChild(shoot);

                var scoreLabel=new Label("");
                scoreLabel.color='#fff';
                scene.addChild(scoreLabel);

                var kumahit=new Sprite(1,1)
                kumahit.x=kuma.x+kuma.width/2;
                kumahit.y=kuma.y+kuma.height/2;
                kumahit.rotate(0);
                scene.addChild(kumahit);

                var stone=new Sprite(70,70);
                stone.image=game.assets['Ball3.png'];
                stone.x=-stone.width
                stone.y=groundline-stone.height;
                stone.scaleX=1;
                stone.scaleY=1;
                stone.onenterframe=function(){
                
                        stone.x+=10;

                    
                };
                scene.addChild(stone);

                var dragon=new Sprite(80,75);
                dragon.image=game.assets['bigmonster1.gif'];
                dragon.x=-dragon.width;
                dragon.y=groundline - dragon.height;
                dragon.frame=0;
                dragon.animeWaitMax = 5;    
                dragon.animeWaitCount = 0;
                dragon.addEventListener('enterframe',function(){
                if(this.animeWaitCount>this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                }else{
                    this.animeWaitCount++;
                }


                });
                
                scene.addChild(dragon);

                var monster1=new Sprite(80,74);
                monster1.image=game.assets['monster5.gif'];
                monster1.x=-monster1.width;
                monster1.y=groundline-monster1.height;
                monster1.frame=0;
                monster1.animeWaitMax = 5;    
                monster1.animeWaitCount = 0;
                monster1.addEventListener('enterframe',function(){
                if(this.animeWaitCount>this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                }else{
                    this.animeWaitCount++;
                }


                });
                scene.addChild(monster1);



                var kumaDead=function(){
                    alert("Game Over");
                    kuma.frame=3;
                    game.pushScene(creategameoverScene(scroll));
                }

                scene.addEventListener(Event.ENTER_FRAME,function(){
                    scroll +=scrollspeed;
                    scrolla=5000-scroll;
                    
                    scoreLabel.text='家まで'+scrolla.toString()+'㍍';

                    if(scroll%1000===0){
                        stone.x=-stone.width;
                       
                    }
                    if(scroll%400===0){
                         stone.scaleX=stone.scaleX+0.25;
                        stone.scaleY=stone.scaleY+0.25;
                    }
                    if(scroll%1500===0){
                        scene.removeChild(stone);
                    }

                    if(stone.intersect(kumahit)){
                            kumaDead();
                    }
                    if(scroll%280===0){
                        monster1.x=320;

                    }
                    if(monster1.x>-dragon.width){
                        monster1.x -=scrollspeed;
                        if(monster1.intersect(kumahit)){
                            kumaDead();
                        }

                    }


                        
                       
                    
                   

                    kumahit.x=kuma.x+kuma.width/2;
                    kumahit.y=kuma.y+kuma.width/2;

                    bg1.x-=scrollspeed;
                    
                    bg2.x-=scrollspeed;


                    if(bg1.x<=-320){
                        bg1.x=320;
                    

                    }
                    if (bg2.x<=-320) {
                        bg2.x=320;
                        

                    }
                    if(scroll%2===0){
                        stone.rotate(8);
                    }
                    if(scroll%800===0){
                        dragon.x=320;
                    }

                    
                    if(dragon.x>-dragon.width){
                        dragon.x -=scrollspeed;
                        if(dragon.intersect(kumahit)){
                            kumaDead();
                        }

                    }




                });


             return scene;
            };
            
            game.replaceScene(createStartScene());


       
    }
    game.start();
}
