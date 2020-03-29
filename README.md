# 一、小榔头记账小程序
### 1、简介
      小榔头记账小程序是基于uni-app与node.js开发的一款微信小程序，其中功能有添加消费记录、查询消费记录、删除消费记录、问题反馈、海报分享等功能。
### 2、开发环境的搭建
####  1、微信小程序的搭建
     （1）、Hbuilder下载开发工具：https://www.dcloud.io/hbuilderx.html
     
     （2）、新建项目、选择uni-app新建项目
     
     （3）、在manifest.json文件中 配置微信小程序appid
#### 2、后端运行环境搭建（服务器选择的是windows Server）
      作者这里使用的windows服务器搭建的所以主要以windows示例为主
    
      （1）、先在node.js官网下载node.js  https://nodejs.org/zh-cn/download/
             根据自己服务器的环境下载
        
      （2）、通过cmd命令检查是否安装成功  node -v
      
      （3）、安装express框架 npm install -g express-generator（使用了express生成器）；
      
      （4）、安装exress中间件。用来解析post请求  npm install -S body-parser；
      
      （5）、安装 http-errors    npm install -s http-errors
             安装 cookie-parser  npm install -s cookie-parser
             安装 morgan         npm install -s morgan
             安装 mysql          npm install -s mysql
       
       （6）、安装更新包  npm -g install supervisor
              命令：supervisor app.js 可以实现文件更改后自动更新
              
#### 3、介绍
    本次项目是本人第一次开源，可能有很多bug，希望同行能多多指教。有问题时希望第一时间联系作者QQ:1289687596;
           
