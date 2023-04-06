const { ManagementClient } = require('authing-js-sdk')
const { token, appId, host, userPoolId, accessKeyId, accessKeySecret, secret} = require('./config.json')

const authingManagementClient = new ManagementClient({
  userPoolId,
  secret,
  host,
})

module.exports.authingManagementClient = authingManagementClient
module.exports.appId = appId
module.exports.host = host
module.exports.token = token
module.exports.userPoolId = userPoolId