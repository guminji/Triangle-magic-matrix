/**
 * Created by guminji on 2017/7/17.
 */
 //房间
class Room extends laya.ui.Component{
    constructor(){
        super();
        this.TranglePool = [];
        this.init();
    }
    init(){
        //创建主游戏区域
        var Gamebg = new GameBG();
        this.addChild(Gamebg);
        var trangleContainer = this.trangleContainer = new trangleRoom();
        Gamebg.addChild(trangleContainer);
        //绘制room主背景
        webgm.roomSprite.sprite(this,'roomBG.jpg');
        Laya.stage.addChild(this);
    }
}
//三角背景
class GameBG extends laya.ui.Box{
    constructor(){
        super();
        this.left = 300;
        this.centerY = 0;
        this.height = webgm.roomSprite.getTexture('trangleContainer.png').height;
        this.width = webgm.roomSprite.getTexture('trangleContainer.png').width;
        this.init();
        //webgm.roomSprite.sprite(this,'trangleContainer.png')
    }
    init(){
        //绘制背景
        webgm.roomSprite.sprite(this,'trangleContainer.png');
    }
}
//三角矩阵
class trangleRoom extends laya.ui.Box{
    constructor(){
        super();
        this.height = 478;
        this.width = 533;
        this.left = 72;
        this.top = 66;
        this.TranglePool = [];//15个三角存放池
        this.init();
        this.bindEvent();
    }
    init(){
        //测试使用
        //this.graphics.drawRect(0,0,533,478,'red');
        //webgm.roomSprite.sprite(this,'trangleContainer.png')
        this.createTranglePool()
    }
    createTranglePool(){
        var self = this;
        for(let i = 0;i<16;i++){
            var type = i%2?'down':'up';
            if(i>=7&&i<=11){
                type = i%2?'up':'down';
            }
            if(i==15){
                type = i%2?'up':'down';
            }
            var trangle = new singletrangle({type:type,index:i});
            self.addChild(trangle);
            console.log(trangle);
            self.TranglePool.push(trangle);
        }
    }
    bindEvent(){
        this.stage.on('click',this,function(e){
                 this.matchTriangle(e.stageX,e.stageY);
        })
    }
    pointInTriangle(point,type) {
        var x0 = point.x;
        var y0 = 111-point.y;
        if(type=='upTrangle'){
            var x1 = 47,y1 = 111,x2=102,y2=9,x3=0,y3=0;
        }
        else{
            var x1 = 56,y1=0,x2=0,y2=96,x3=103,y3=111;
        }
        var divisor = (y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3);
        var a = ((y2 - y3)*(x0 - x3) + (x3 - x2)*(y0 - y3)) / divisor;
        var b = ((y3 - y1)*(x0 - x3) + (x1 - x3)*(y0 - y3)) / divisor;
        var c = 1 - a - b;
        return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1
    }
    matchTriangle(x,y){
        var self = this;
        var matchArray = [];
        this.TranglePool.forEach(function(e,i){
            /*var newlocalPoint = e.globalToLocal({
                x:x,
                y:y
            });*/
            //console.log(newlocalPoint)
            // if(newlocalPoint.x>=0&&newlocalPoint.x<=103&&newlocalPoint.y>=0&&newlocalPoint.x<=111){
            if(!!e.hitTestPoint(x,y)){
                matchArray.push(e);
            }
        })
        if(!!matchArray.length){
            matchArray.forEach(function(e,i){
                var newlocalPoint = e.globalToLocal({
                    x:x,
                    y:y
                });
                if(!!self.pointInTriangle(newlocalPoint,e.type)){
                    console.log(e.sortNumber);
                    alert(e.sortNumber);
                    return
                }
            })
        }
    }
}

//单个三角类
class singletrangle extends laya.ui.Box{
    constructor(options){
        super();
        //默认三角的
        this.angle = 3.4;  //三角形斜角
        this.type = null;  //三角形的形状 upTrangle为正三角 downTrangle 为倒三角
        this.sortNumber = options.index;
        this.trangleColor = null; //三角的颜色
        this.position = null; //三角的位置
        this.height =111;
        this.width = 103;

        //this.graphics.drawRect(0,0,this.width,this.height,'black');
        this.init(options);
    }
    init(options){
        var strangleContainer =this.trangleImg= new laya.ui.Image();
        //设置三角为正还是为倒立
        var imgsrc = options.type=='up'?'uptrangle.png':'downTrangle.png';
        this.type = options.type == 'up'?'upTrangle':'downTrangle';
        webgm.setSprite(strangleContainer,{
            source:webgm.trangle.getTexture(imgsrc),
            height:webgm.trangle.getTexture(imgsrc).height,
            width:webgm.trangle.getTexture(imgsrc).width,
            centerX:0,
            centerY:0
            //left:0,
            //top:0
        })
        //设置每个三角形的位置
        this.setPosition(this,options.index);
        this.addChild(strangleContainer);
    }
    //动画缩小scale 然后移动到最下端
    animation(){
        this.trangleImg.scale(0.1,0.1);
        laya.utils.Tween.to(this,{bottom:20,left:450},1000,null)
    }
    setPosition(target,index){
        webgm.setSprite(target,{
            bottom:160*Math.sin(Math.PI / 180 * 3.2 )*(parseInt(index/2)+(index%2?1:0))+10*Math.sin(Math.PI / 180 * 3.2 )*parseInt(index/2),
            left:170*Math.cos(Math.PI / 180 * 66)*(parseInt(index/2)+(index%2?1:0))+168*Math.cos(Math.PI / 180 * 63.2)*parseInt(index/2),
        })
        //第二排位置
        if(index>=7&&index<=11){
            index = index-7;
            webgm.setSprite(target,{
                bottom:116+160*Math.sin(Math.PI / 180 * 3.2 )*(parseInt(index/2)+(index%2?1:0))+10*Math.sin(Math.PI / 180 * 3.2 )*parseInt(index/2),
                left:170*Math.cos(Math.PI / 180 * 66)*1+170*Math.cos(Math.PI / 180 * 66)*(parseInt(index/2)+(index%2?1:0))+168*Math.cos(Math.PI / 180 * 63.2)*parseInt(index/2),
            })
        }
        //第三排位置
        if(index>=12&&index<=14){
            index = index-12;
            webgm.setSprite(target,{
                bottom:116*2+160*Math.sin(Math.PI / 180 * 3.2 )*(parseInt(index/2)+(index%2?1:0))+10*Math.sin(Math.PI / 180 * 3.2 )*parseInt(index/2),
                left:170*Math.cos(Math.PI / 180 * 66)*1+168*Math.cos(Math.PI / 180 * 63.2)*1+170*Math.cos(Math.PI / 180 * 66)*(parseInt(index/2)+(index%2?1:0))+168*Math.cos(Math.PI / 180 * 63.2)*parseInt(index/2)-13,
            })
        }
        //第四排位置
        if(index>=15){
            index = index-15;
            webgm.setSprite(target,{
                bottom:116*3+160*Math.sin(Math.PI / 180 * 3.2 )*(parseInt(index/2)+(index%2?1:0))+10*Math.sin(Math.PI / 180 * 3.2 )*parseInt(index/2),
                left:170*Math.cos(Math.PI / 180 * 66)*2+168*Math.cos(Math.PI / 180 * 63.2)*1+170*Math.cos(Math.PI / 180 * 66)*(parseInt(index/2)+(index%2?1:0))+168*Math.cos(Math.PI / 180 * 63.2)*parseInt(index/2)-20,
            })
        }
    }
}
//顶部UI
class topUI extends laya.ui.Box{
    constructor(){

    }
}
class bottomUI extends laya.ui.Box{
    constructor(){

    }
}