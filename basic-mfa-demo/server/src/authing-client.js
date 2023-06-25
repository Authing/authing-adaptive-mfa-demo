const { ManagementClient } = require('authing-node-sdk')
const { appId, host, userPoolId, accessKeySecret} = require('./config.json')

const authingManagementClient = new ManagementClient({
  accessKeyId: userPoolId,
  accessKeySecret,
  host,
})

module.exports.authingManagementClient = authingManagementClient
module.exports.appId = appId