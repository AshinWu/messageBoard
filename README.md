# messageBoard
基于koa的留言板

项目详情请戳: https://www.cnblogs.com/wzs5800/p/10786134.html

## 安装

### 环境
- nodejs
- mysql 5.7

### 导入数据库

将数据库文件(.sql)导入数据库（推荐使用Navicat for MySql）

### 安装依赖

```js
npm install
```

## 使用

```js
npm start
```

```
localhost:3000
```

## 配置

config/db

```js
// 默认配置, 自行修改
database: {
  DATABASE: 'message_board',
  USERNAME: 'root',
  PASSWORD: 'root',
  PORT: '3306',
  HOST: 'localhost',
  CONNECTIONLIMIT: 10
}
```

## 问题和建议

- 数据库有一些初始数据, 仅供展示用

- 本系统供学习, 没有单元测试代码



