const { MetadataManagementClient } = require('authing-node-sdk');
const { ManagementClient } = require('authing-js-sdk')
const { token,appId, host, userPoolId, accessKeySecret, modelId} = require('./config.json')

const authingMetadataManagementClient = new MetadataManagementClient({
    accessKeyId: userPoolId,
    accessKeySecret,
    host,
});

const authingManagementClient = new ManagementClient({
  userPoolId,
  secret: accessKeySecret,
  host,
})

const ueba = authingMetadataManagementClient.getUebaModel(modelId);

module.exports.authingMetadataManagementClient = authingMetadataManagementClient
module.exports.authingManagementClient = authingManagementClient
module.exports.ueba = ueba
module.exports.appId = appId
module.exports.userPoolId = userPoolId
module.exports.token = token
module.exports.host = host
