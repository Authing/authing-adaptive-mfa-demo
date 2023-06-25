Authing 身份云持续自适应 MFA 示例 demo

# 基础登录 demo
目录 `login-demo`

```
# server start up
cd login-demo/server
npm i
npm run start

# client start up
cd login-demo/client
npm i
npm run watch
```

# 对接 MFA 登录 demo
目录 `basic-mfa-demo`


```
# server start up
cd basic-mfa-demo/server
npm i
npm run start

# client start up
cd basic-mfa-demo/client
npm i
npm run watch
```

# 启动前修改参数

## server 端

1. 将 config.json.example 重命名成 config.json 。
2. 参照官方文档获取相应的配置信息。其中 `host` 和 `modelId` 不用修改。
    ```json
   {
        "token": "管理员token",
        "appId": "你的 appId",
        "host": "https://console.authing.cn",
        "userPoolId": "你的 userpoolId",
        "accessKeyId": "你的 userpoolId",
        "accessKeySecret": "你的密钥",
        "modelId": "ueba"
    }
    ```
## client 端

1. 将 config.json.example 重命名成 config.json 。
2. 参照官方文档获取相应的配置信息。其中 `host` 不用修改。
   ```json
   {
       "appId": "",
       "host": "https://console.authing.cn",
       "userPoolId": "",
       "accessKeySecret": ""
   }
   ```

