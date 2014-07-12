enchant();



window.onload = function() {
   

    var game = new Game(360, 320);
    game.fps = 24;
    game.keybind(32,'space');
    game.keybind(13,'enter');

    
    
    game.preload('home.png','ok.wav','chara1.png','end.png', 'gameover.png', 'gun01.wav','jump.wav','retry_button.png', 'gameover.wav','start.png','kuma.png','Ball3.png','bigmonster1.gif','monster5.gif','bullet.png','boom10.png','fire01.mp3','goals.png','field.wav','explode.wav','clear.png','goal.png','bigmonster2.gif','monster3.gif','mori.png','mori2.png','Ball2.png','mori3.png','stone1.png','fish.png','stone2.png','seald.png','get.wav','goalmusic.wav','chara7.png');
    game.onload = function() {
        var bgm=game.assets['field.wav'];
        
         
        

        var createStartScene=function(){
            var scene = new Scene();
            scene.backgroundColor='#DBDD6F';
            
            var startImage = new Sprite(236,48);
            startImage.image = game.assets['start.png'];

            startImage.x=70;
            startImage.y=136;
            scene.addChild(startImage);


            var kuma =new Sprite(160,32);
            kuma.image=game.assets['chara1.png'];
        
            kuma.x=90;
            kuma.y=100;

            scene.addChild(kuma);
            



            /*タイトル表示*/
            var title = new Label('くまの日常');
            title.width=360;
            title.textAlign='center';
            title.color='#965534';
            title.x=0;
            title.y=40;
            title.font='44px sans-serif';
            scene.addChild(title);


            var info1=new Label('STARTを押してPlay');
            info1.width=360;
            info1.textAlign='center';
            info1.color='#000000';
            info1.x=0;
            info1.y=220;
            info1.font='20px sans-serif';
            scene.addChild(info1);

            var info2=new Label('Spaceでジャンプ/Enterで攻撃');
            info2.width=360;
            info2.textAlign='center';
            info2.color='#000000';
            info2.x=0;
            info2.y=250;
            info2.font='20px sans-serif';
            scene.addChild(info2);

           
            startImage.addEventListener(Event.TOUCH_START,function(){
                game.replaceScene(GameScene());
                game.assets['ok.wav'].clone().play();
                game.assets['goalmusic.wav'].stop();
            });
            return scene;
            

            };

            var GameScene=function(){
                var scroll=0;

                var groundline=250;
                var scrollspeed=8;
                bgm.play();

               



                

                var scene=new Scene();
                scene.backgroundColor='#87CEEB';

　　　　　　　　　　/*背景１の設定*/
                var bg1=new Sprite(360,320);
                bg1.image=game.assets['mori3.png'];
                bg1.x=0;
                bg1.y=0;
                bg1.rotate(0);
                scene.addChild(bg1);

               
　　　　　　　　　　/*背景２の設定*/
                var bg2=new Sprite(360,320);
                bg2.image=game.assets['mori3.png'];
                bg2.x=360;
                bg2.y=0;
                bg2.rotate(0);
                scene.addChild(bg2);

　　　　　　　　　　/*効果の設定*/
                var effect=new Sprite(128,128);
                effect.image=game.assets['boom10.png'];
                effect.x;
                effect.y;
               
              
              



                /*クマの設定*/

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
　　　　　　　　　　
　　　　　　　　　　/*弾の設定*/
                 var shoot=new Sprite(16,16);
                shoot.image=game.assets['bullet.png'];
                shoot.x=-10000;
                shoot.y=kuma.y;
                shoot.onenterframe=function(){
                    var input=game.input;
                    if(input.enter===true){
                        game.assets['gun01.wav'].clone().play();
                        shoot.x=kuma.x;
                        shoot.y=kuma.y;
                        }
                        this.x+=10;
                     if(input.enter===false){

                        return;
                     }   
                 
                

                };
                scene.addChild(shoot);
                /*バリアの設定*/
                var seald=new Sprite(60,60);
                seald.image=game.assets['seald.png'];
                seald.x=-10000;
                seald.y=groundline-seald.height+10;
                seald.onenterframe=function(){
                    var input=game.input;
                    if(input.space===true&& seald.y===groundline-seald.height+10){
                        seald.tl.moveBy(0, -120, 12, enchant.Easing.CUBIC_EASEOUT) 
                           .moveBy(0, 120, 12, enchant.Easing.CUBIC_EASEIN); 
                           

                       }
                     
                };

                scene.addChild(seald);


                /*シャケの設定*/
                var fish=new Sprite(30,30);
                fish.image=game.assets['fish.png'];
                fish.x=-fish.width;
                fish.y=groundline-fish.height;
                scene.addChild(fish);

                
                /*家の設定*/
                var home=new Sprite(120,120);
                home.image=game.assets['home.png'];
                home.x=-home.width;
                home.y=groundline-home.height;
                scene.addChild(home);
　　　　　　　　　　　　
　　　　　　　　　　　/*スコアラベルの表示*/
                var scoreLabel=new Label("");
                scoreLabel.color='#fff';
                scene.addChild(scoreLabel);

                　　/*スコアラベルの表示*/
                n=0;
                var scoreLabel2=new Label("敵を倒した数:0");
                scoreLabel2.color='#fff';
                scoreLabel2.x=240;
                scoreLabel2.y=0;
                scene.addChild(scoreLabel2);

               
　　　　　　　　　　
　　　　　　　　　　　/*クマのあたり判定素材*/
                var kumahit=new Sprite(5,20)
                kumahit.x=kuma.x+kuma.width/2;
                kumahit.y=kuma.y+kuma.height/2;
                kumahit.rotate(0);
                scene.addChild(kumahit);

　　　　　　　　　　/*石の設定*/
                var stone=new Sprite(70,70);
                stone.image=game.assets['Ball2.png'];
                stone.x=-stone.width
                stone.y=groundline-stone.height;
                stone.scaleX=1;
                stone.scaleY=1;
                stone.onenterframe=function(){
                
                        stone.x+=10;

                    
                };
                scene.addChild(stone);

                　　/*石2の設定*/
                var stone2=new Sprite(70,70);
                stone2.image=game.assets['stone1.png'];
                stone2.x=-2*stone2.width
                stone2.y=groundline-stone2.height;
                stone2.scaleX=1;
                stone2.scaleY=1;
       
                scene.addChild(stone2);

                 /*ドラゴンの設定*/
                var dragon=new Sprite(80,75);
                dragon.image=game.assets['bigmonster1.gif'];
                dragon.x=-dragon.width;
                dragon.y=groundline - dragon.height;
                dragon.frame=0;
                dragon.animeWaitMax = 7;    
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

                 /*戦士の設定*/
                var senshi=new Sprite(28,30);
                senshi.image=game.assets['chara7.png'];
                senshi.scaleX=2;
                senshi.scaleY=2;
                senshi.x=-senshi.x-400;
                senshi.y=groundline - senshi.height;
                senshi.frame=0;
                
                senshi.animeWaitMax = 5;    
                senshi.animeWaitCount = 0;
                senshi.addEventListener('enterframe',function(){
                if(this.animeWaitCount>this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                }else{
                    this.animeWaitCount++;
                }


                });
            
                scene.addChild(senshi);
　　　　　　　　　
　　　　　　　　　　　/*モンスター１の設定*/
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
                
                /*モンスター２の設定*/
                var monster2=new Sprite(80,78);
                monster2.image=game.assets['bigmonster2.gif'];
                monster2.x=-monster2.width;
                monster2.y=groundline-monster2.height;
                monster2.frame=0;
                monster2.animeWaitMax = 5;    
                monster2.animeWaitCount = 0;

                monster2.addEventListener('enterframe',function(){
                if(this.animeWaitCount>this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                }else{
                    this.animeWaitCount++;
                }
                

                });
          
                scene.addChild(monster2);


                /*飛行モンスター*/
                var monster3=new Sprite(30,30);
                monster3.image=game.assets['monster3.gif'];
                monster3.x=-monster3.width;
                monster3.y=40;
                monster3.frame=0;
                monster3.animeWaitMax =9;    
                monster3.animeWaitCount = 0;

                monster3.addEventListener('enterframe',function(){
                if(this.animeWaitCount>this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                }else{
                    this.animeWaitCount++;
                }
                

                });
                scene.addChild(monster3);







　　　　　　　　　　　/*クマが死んだときの表示*/
                var kumaDead=function(){
                    alert("ドンマイ　ドンマイ！！！ヾ(･∀･`)");
                    kuma.frame=3;
                    game.pushScene(creategameoverScene(scroll));
                }
                  /*クマがゴールしたときの表示*/
                var kumaGoal=function(){
                    game.pushScene(creategoalScene(scroll));
                }

                scene.addEventListener(Event.ENTER_FRAME,function(){
                    scroll +=scrollspeed;
                    scrolla=6000-scroll;
                    

                    scoreLabel.text='家まで'+scrolla.toString()+'㍍';
                    
                    /*石が現れる条件*/
                    if(scroll%1000===0){
                        stone.x=-stone.width;
                            
              
                    }
                    /*石２が現れる条件*/
                     if(scroll%1200===0){
                        stone2.x=360;
                       
                    stone2.x -=scrollspeed;
                     stone2.tl.moveTo(300, 50, 12, enchant.Easing.CUBIC_EASEOUT) 
                           .moveTo(0, 200, 17, enchant.Easing.CUBIC_EASEIN); 


                       
                    }

                    if(scroll%2===0){
            
                        stone2.rotate(-30);
                            }
                    /*石2とクマが当たったら*/
                       if(stone2.x>-stone2.width-50){
                        stone2.x -=scrollspeed;
                        if(stone2.intersect(kumahit)){
                            kumaDead();
                            bgm.stop();
                        }

                    }

                    /*４００スクロールごとに石の大きさ変化*/
                    if(scroll%400===0){
                         stone.scaleX=stone.scaleX+0.25;
                        stone.scaleY=stone.scaleY+0.25;
                        
                    }
                    /*石の消える条件*/
                    if(scroll%1500===0){
                        scene.removeChild(stone);
                    }
                    
                    /*石とクマが当たったら*/
                    if(stone.intersect(kumahit)){
                            kumaDead();
                            bgm.stop();
                    }

                    /*モンスター１出現条件*/
                    if(scroll%300===0){
                        monster1.x=360;

                    }
                    /*モンスター１とクマが当たったら*/
                    if(monster1.x>-monster1.width){
                        monster1.x -=scrollspeed;
                        if(monster1.intersect(kumahit)){
                            kumaDead();
                            bgm.stop();
                        }

                    }
                    /*モンスタ−２出現条件*/
                    if(scroll%500===0){
                        monster2.x=360;
                    }
                    /*モンスター２とクマが当たったら*/
                    if(monster2.x>-monster2.width){
                        monster2.x -=scrollspeed;
                        if(monster2.intersect(kumahit)){
                            kumaDead();
                            bgm.stop();
                    }
                    }

                    /*戦士出現条件*/
                    if(scroll%2400===0){
                        senshi.x=360;
                    }

                    /*戦士とクマが当たったら*/
                    if(senshi.x>-2*senshi.width){
                        senshi.x -=scrollspeed;
                        if(senshi.intersect(kumahit)){
　　　　　　　　　　　　　　　　bgm.stop();
                            kumaDead();
                        }

                    }


　　　　　　　　　　　　/*飛行モンスター出現条件*/
　　　　　　　　　　　　if(scroll%1000===0){
                       monster3.x=360;

                     }
                     /*飛行モンスターとクマが当たったら*/
                    if(monster3.x>-monster3.width){
                        monster3.x -=2*scrollspeed;
                        monster3.y=90;
                        if(monster3.intersect(kumahit)){
                            kumaDead();
                            bgm.stop();
                        }

                    }


                    /*シャケのスクロール条件と取ったら消える設定*/
                    if(fish.x>-fish.width){
                        fish.x -=scrollspeed;
                           if(fish.intersect(kumahit)){

　　　　　　　　　　　　　　　　scene.removeChild(fish);
                            seald.x=kuma.x-15;
                            setTimeout(function(){
                            seald.x=-10000;


                       },3500);


                     }

                     }

                     /*シャケの復活*/
                     if(fish.x<-fish.width){
                        
　　　　　　　　　　　　　　　　scene.addChild(fish);
                     }

                     /*シャケ出現条件*/
                    if(scroll%1400===0){
                     　fish.x=360;
                    
                    }

                     



                     /*ドラゴンの出てくる条件*/
                    if(scroll%880===0){
                        dragon.x=360;
                    }

                    /*ドラゴンとクマが当たったら*/
                    if(dragon.x>-dragon.width){
                        dragon.x -=scrollspeed;
                        if(dragon.intersect(kumahit)){
　　　　　　　　　　　　　　　　bgm.stop();
                            kumaDead();
                        }

                    }
                    /*家が現れる条件*/
                    if(scroll===5800){
                        home.x=360;

                        }
                    /*家の条件*/  
                    if(home.x>-home.width){
                            home.x-=scrollspeed;
                    }


                    /*ゴールの条件*/
                    if(scroll===6000){
                        kumaGoal();
                    }



                    /*弾がドラゴンと当たったときの反応*/
                    if(shoot.intersect(dragon)){
                        game.assets['explode.wav'].clone().play();
                          n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        effect.x=dragon.x;
                        effect.y=dragon.y;
                        dragon.tl.moveTo(1200,dragon.y,2);
                        scene.addChild(effect);
                        shoot.x=-10000;
                        setTimeout(function(){
                            scene.removeChild(effect);


                       },150);
                       

                    }

                    /*バリアがドラゴンと当たったときの反応*/
                    if(seald.intersect(dragon)){
                        game.assets['explode.wav'].clone().play();
                         n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        
                        effect.x=dragon.x;
                        effect.y=dragon.y;
                        dragon.tl.moveTo(1000,dragon.y,2);
                        scene.addChild(effect);
                        
                        setTimeout(function(){
                            scene.removeChild(effect);


                       },150);
                       

                    }

                    /*弾が戦士と当たったときの反応*/
                    if(shoot.intersect(senshi)){
                        game.assets['explode.wav'].clone().play();
                          n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        effect.x=senshi.x;
                        effect.y=senshi.y;
                     
                        scene.addChild(effect);
                        senshi.tl.moveTo(1200,senshi.y,1.5)
                        shoot.x=-20000;
                        setTimeout(function(){
                            scene.removeChild(effect);


                       },150);
                        

                    }

                    /*バリアが戦士と当たったときの反応*/
                    if(seald.intersect(senshi)){
                        senshi.tl.moveTo(1200,senshi.y,1.5);
                        game.assets['explode.wav'].clone().play();
                         n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;

                        effect.x=senshi.x;
                        effect.y=senshi.y;
                        scene.addChild(effect);
                       
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);
                    }

                    /*弾がモンスター１と当たったときの反応*/
                    if(shoot.intersect(monster1)){
                        monster1.tl.moveTo(700,monster1.y,1.5);
                        game.assets['explode.wav'].clone().play();
                          n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        effect.x=monster1.x;
                        effect.y=monster1.y;
                        scene.addChild(effect);
                        shoot.x=-10000;
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);


                       
                    }

                    /*バリアがモンスター１と当たったときの反応*/
                    if(seald.intersect(monster1)){
                        monster1.tl.moveTo(1200,monster1.y,1.5);
                        game.assets['explode.wav'].clone().play();
                        n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        effect.x=monster1.x;
                        effect.y=monster1.y;
                        scene.addChild(effect);
                       
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);


                       
                    }
                    /*弾がモンスター2と当たったときの反応*/
                    if(shoot.intersect(monster2)){
                        monster2.tl.moveTo(900,monster2.y,1.5);
                        game.assets['explode.wav'].clone().play();
　　　　　　　　　　　　　　 n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;
                        effect.x=monster2.x;
                        effect.y=monster2.y;
                        scene.addChild(effect);
                        shoot.x=-10000;
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);

                    
                       
                    }
                    /*バリアがモンスター2と当たったときの反応*/
                    if(seald.intersect(monster2)){
                        monster2.tl.moveTo(1000,monster2.y,1.5);
                        game.assets['explode.wav'].clone().play();
                         n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;

                        effect.x=monster2.x;
                        effect.y=monster2.y;
                        scene.addChild(effect);
                       
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);

                    
                       
                    }


                    /*弾が飛行モンスタ＝と当たったときの反応*/
                    if(shoot.intersect(monster3)){
                        monster3.tl.moveTo(600,monster3.y,1.5);
                        game.assets['explode.wav'].clone().play();
                         n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;

                        effect.x=monster3.x;
                        effect.y=monster3.y;
                        scene.addChild(effect);
                        shoot.x=-10000;
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);


                       
                    }
                    /*バリアが飛行モンスタ＝と当たったときの反応とスコアカウント*/
                    if(seald.intersect(monster3)){
                        monster3.tl.moveTo(600,monster3.y,1.5);
                        game.assets['explode.wav'].clone().play();
                         n=n+1;
                        scoreLabel2.text="敵を倒した数:"+n;

                        effect.x=monster3.x;
                        effect.y=monster3.y;
                        scene.addChild(effect);
                        
                        setTimeout(function(){
                            scene.removeChild(effect);
                            
                        },150);


                       
                    }


                    kumahit.x=kuma.x+kuma.width/2;
                    kumahit.y=kuma.y+kuma.width/2;

                    bg1.x-=scrollspeed;
                    
                    bg2.x-=scrollspeed;


                    if(bg1.x<=-360){
                        bg1.x=360;
                    

                    }
                    if (bg2.x<=-360) {
                        bg2.x=360;
                        

                    }
                    /*石の回転*/
                    if(scroll%2===0){
                        stone.rotate(8);
                    }
                  




                });


             return scene;
            }
　　　　　　　　/*ゴールシーン*/
            var creategoalScene=function(scroll){
                var scene =new Scene();
                scene.backgroundColor='#228b22'
                game.assets['goalmusic.wav'].play();
                bgm.stop();


                var goal=new Sprite(320,225);
                goal.image=game.assets['goal.png'];
                goal.x=30;
                goal.y=70;
                scene.addChild(goal);

                var clear=new Sprite(267,48);
                clear.image=game.assets['clear.png'];
                clear.x=40;
                clear.y=260;
                scene.addChild(clear);

                var endlabel=new Label('ただいまっ!');
                endlabel.width=360;
                endlabel.textAlign='center';
                endlabel.color='#eee8aa';
                endlabel.x=0;
                endlabel.y=40;
                endlabel.font='50px sans-serif';
                endlabel.fontWeight='bolder';
                scene.addChild(endlabel);

                var info3=new Label('もう一回');
                info3.width=360;
                
                info3.color='#fff';
                info3.x=270;
                info3.y=0;
                info3.font='15px sans-serif';
                info3.addEventListener(Event.TOUCH_END,function(){
                    game.popScene();
                    game.replaceScene(createStartScene());
                    game.assets['ok.wav'].clone().play();
                });

                scene.addChild(info3);

                 // スコア表示用ラベルの設定
            var scoreLabel = new Label('倒した敵数:'+n.toString());                        
            scoreLabel.width = 360;                                    
            scoreLabel.color = '#ffffff';                              // 文字を白色に
            scoreLabel.x = 0;                                          // 横位置調整
            scoreLabel.y = 0;                                         // 縦位置調整
            scoreLabel.font = '15px sans-serif';                       // 28pxのゴシック体にする
            scene.addChild(scoreLabel);                                // シーンに追加


                return scene;

            }

             /*ゲームオーバーシーン*/
            var creategameoverScene=function(scroll){
                var scene=new Scene();
                game.assets['gameover.wav'].clone().play();
                


                var gameover=new Sprite(189,97);
                gameover.image=game.assets['end.png'];
                gameover.x=80;
                gameover.y=50;

                scene.addChild(gameover);
                
                /*リトライボタン*/
                var retry=new Sprite(320,32);
                retry.image=game.assets['retry_button.png'];
                retry.x=25;
                retry.y=150;
                retry.addEventListener(Event.TOUCH_END,function(){
                    game.popScene();
                    game.replaceScene(createStartScene());
                    game.assets['ok.wav'].clone().play();

                });
                scene.addChild(retry);
                return scene;

            };

            
            game.replaceScene(createStartScene());


       
    }
    game.start();
}
