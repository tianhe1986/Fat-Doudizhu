# 斗地主客户端 layabox - typescript(ts)

此客户端源自 [WangQingye](https://github.com/WangQingye) 的[白鹭客户端](https://github.com/WangQingye/Doudizhu-client)，用Layabox重写的，并修复了其中一些牌型判断的问题。

# 使用
1. 安装nodejs和layabox环境，这个自行百度吧。我安装的node版本是8.9.3，layabox是1.7.18。
2. 下载斗地主服务端，原版的在[这里](https://github.com/WangQingye/Doudizhu-sever)。
我对原版进行了fork，见[这里](https://github.com/tianhe1986/Doudizhu-sever)。我做了一些修复，之后还会有其他的调整，所有的这些都会提pull request，但是也可能不会被merge。

3. 在服务端目录，运行 node app.js，开启服务端。
4. 下载此源码，导入layabox，编译运行即可。

如需更改端口。服务端在 `socket/websocket.js`中修改，客户端在`src/Config/Local.ts`中修改。

可发布成H5和微信小游戏。

# TODO
1. <del>增加服务端对牌型的判断。</del>已在服务端分支实现，见[这里](https://github.com/tianhe1986/Doudizhu-sever/tree/develop_server)
2. 游戏中掉线超时处理。
3. 房间内一局结束后，继续进行下一局。