const { MetadataManagementClient } = require('../authing-component/metadata-sdk/dist');
const { ManagementClient } = require('authing-js-sdk')

const appId = '6421c2b9ce49522bfc07a3f2';
const host = 'https://console.wh.authing-inc.co';
const modelId = '641a7e63ee46aeaf49e39f4d';
const userPoolId = '6418492c9dc4601eea005d02';
const accessKeyId = '6418492c9dc4601eea005d02';
const accessKeySecret = 'e24e2e217ba43be0b4762fe08aff9f8c';
const secret = 'e24e2e217ba43be0b4762fe08aff9f8c';
const authingMetadataManagementClient = new MetadataManagementClient({
    accessKeyId,
    accessKeySecret,
    host,
});

const authingManagementClient = new ManagementClient({
  userPoolId,
  secret,
  host,
})

const ueba = authingMetadataManagementClient.getUebaModel(modelId);

module.exports.authingMetadataManagementClient = authingMetadataManagementClient
module.exports.authingManagementClient = authingManagementClient
module.exports.ueba = ueba
module.exports.appId = appId
module.exports.userPoolId = userPoolId