const { ManagementClient } = require('authing-node-sdk')
const { token, appId, host, userPoolId, accessKeyId, accessKeySecret, secret} = require('./config.json')

const authingManagementClient = new ManagementClient({
  accessKeyId,
  accessKeySecret
})

module.exports.authingManagementClient = authingManagementClient
module.exports.appId = appId
module.exports.host = host
module.exports.token = token
module.exports.userPoolId = userPoolId