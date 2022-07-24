# 全自动实现何同学倒计时头图

<p>

[![Bilibili](https://img.shields.io/badge/dynamic/json?labelColor=FE7398&logo=bilibili&logoColor=white&label=bilibili%20fans&color=00aeec&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D422646817)](https://space.bilibili.com/422646817)
[![Juejin](https://img.shields.io/badge/juejin-%E5%A4%A7%E5%B8%85%E8%80%81%E7%8C%BF-1e80ff?logo=bytedance)](https://juejin.cn/user/2955079655898093)
[![Github Stars](https://img.shields.io/github/stars/ezshine?color=faf408&label=github%20stars&logo=github)](https://github.com/ezshine)
[![Wechat](https://img.shields.io/badge/-%E5%A4%A7%E5%B8%85%E8%80%81%E7%8C%BF-07c160?logo=wechat&logoColor=white&label=wechat)](https://open.weixin.qq.com/qr/code?username=ezfullstack)
  
</p>

# 前言

最近B站刚刚颁布了2021年的百大UP，要说我最喜欢的UP，那必然是 @老师好我叫何同学。何同学的每一个视频都让我感觉很惊艳，那么的有创意。我要是个女孩子，我肯定要给他生猴子。

![](https://gitee.com/ezshine/markdown-pic/raw/master/202201182113611.png)

何同学也是一个极其注重细节的人，不知道大家有没有关注到何同学B站个人空间的头图，右边显示的数字其是何同学上次投稿距今的时间，每天都会变哦。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02f95f969a9342f2990e60e31f4e25b7~tplv-k3u1fbpfcp-watermark.image?)

果真是个细节狂魔~ 【nice】

我并不知道何同学具体是如何实现的，但作为一个热爱编程的老程序猿，思路很快就在我脑海里浮现出来了。经过一天疯狂的敲代码，我已经完全实现了和何同学一样的效果，无需服务器无需打开电脑，每天会自动更新。


# 使用本项目

> 温馨提示：只有B站大会员可以自定义头图

```
https://github.com/ezshine/auto-bilibili-topphoto
```

## 步骤1：

fork本仓库

![](https://gitee.com/ezshine/markdown-pic/raw/master/202201190050185.png)

## 步骤2：

用Chrome浏览器打开B站，进入自己的个人空间，按下F12，切换到`application`标签

![](https://gitee.com/ezshine/markdown-pic/raw/master/202201190053045.png)

在Cookie中找到这四个参数，然后打开自己分支仓库，点击`Settings`，进入`Secrets`，点击`New repository secret`将四个参数一一配置好

![](https://gitee.com/ezshine/markdown-pic/raw/master/202201190054562.png)

## 步骤3：

手动执行一次工作流，以后就可以自动定时运行了！

![](https://gitee.com/ezshine/markdown-pic/raw/master/202201190057628.png)

