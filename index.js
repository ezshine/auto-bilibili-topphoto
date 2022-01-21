const { createCanvas, loadImage ,registerFont } = require('canvas');
const fs = require("fs");
const axios = require('axios');

const [BILI_JCT, SESSDATA,DEDEUSERID,DEDEUSERID__CKMD5] = process.argv.slice(2);

//注册字体
registerFont('digit.ttf', { family: 'digit' });

//B站推荐头图尺寸2560x400，最小尺寸1280x200
const canvasSize = {w:2560,h:400};

//创建画布
const canvas = createCanvas(canvasSize.w, canvasSize.h);
//获得画布的绘制对象
const ctx = canvas.getContext('2d');

//清空画布
function clearCanvas(bgColor='#000000'){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvasSize.w, canvasSize.h);
}

//将画布保存为本地文件
function saveCanvasToImage(file){
    fs.writeFileSync(file,canvas.toBuffer());
}

//上传B站头图
async function postTopPhoto(base64){
    const res = await axios.request({
        url:"https://space.bilibili.com/ajax/topphoto/uploadTopPhotov2",
        method:"POST",
        data:"topphoto="+base64+"&csrf="+BILI_JCT,
        headers:{
            'referer': 'https://space.bilibili.com/'+DEDEUSERID,
            "accept": "application/json, text/plain, */*",
            "Content-Type":"application/x-www-form-urlencoded",
            "Origin": "https://space.bilibili.com",
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
            "Cookie":
                "SESSDATA="+SESSDATA+";"+
                "bili_jct="+BILI_JCT+";"+
                "DedeUserID="+DEDEUSERID+";"+
                "DedeUserID__ckMd5="+DEDEUSERID__CKMD5+";"
        }
    })
}

/*
移动端空间 todo
https://space.bilibili.com/api/member/uploadTopPhoto?access_key=8a135f48fc67e8216d35e44262295711&actionKey=appkey&appkey=27eb53fc9058f8c3&build=65700100&device=phone&&isNotNeedFileNameKey=1&mobi_app=iphone&platform=ios&sign=cde627802010d90b3476cc8f8db4f36a&ts=1642609465
*/

//计算两个日期相差的天数
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

//获取自己鸽的天数
async function getLastPubDistance(){
    //https://api.bilibili.com/x/space/arc/search?mid="+(event.bili_user_id||'422646817')+"&ps=10&tid=0&pn="+(event.page||1)+"&keyword=&order=pubdate&jsonp=jsonp
    const res = await axios.request({
        url:"https://api.bilibili.com/x/space/arc/search?mid="+DEDEUSERID+"&pn=1&ps=1&order=pubdate&jsonp=jsonp"
    });

    
    try{
        return diffDays(new Date(res.data.data.list.vlist[0].created*1000),new Date())+"";
    }catch(err){
        console.log("没有发现投稿");
        console.log(err);
        return 0;
    }

    
}

//执行绘制图片
async function painting(){
    clearCanvas();

    //添加背景图
    const bgImage = await loadImage('bg.jpg');
    ctx.drawImage(bgImage, 0, 0, canvasSize.w, canvasSize.h);

    //设置文字颜色和字号，字体
    ctx.fillStyle = "#e6433a";
    ctx.font = '97px digit';

    //获得鸽的天数
    let days = await getLastPubDistance();

    //计算文字尺寸
    let size = ctx.measureText(days);
    const txt_x = 2020;
    const txt_y = 135;

    //转换后续的transform的基点
    ctx.translate(txt_x, txt_y);

    /*
    a	水平缩放绘图
    b	水平倾斜绘图
    c	垂直倾斜绘图
    d	垂直缩放绘图
    e	水平移动绘图
    f	垂直移动绘图
    */
    ctx.transform(1,-0.3,0,1,0,0);

    //将文字绘制到指定坐标
    ctx.fillText(days, -size.width/2, 0);

    //canvas转base64编码后上传
    const base64 = encodeURIComponent(canvas.toDataURL("image/png").substring(22));
    postTopPhoto(base64);
}

painting();