const {ueba, appId} = require('./authing-client')

const generateUEBAData = (req) => {
    return {
        appId,
        // "browserType": "Chrome",
        ip: req.ip,
        deviceType: req.headers['sec-ch-ua-platform'] || 'mobile',
        ua: req.headers['user-agent']
    }
}

const mockData = {
    appId,
    ip: '117.133.11.139',
    ua: 'ua',
    behaviorType: 'login',
    actionType: 'Read',
    loginType: 'wechat',
    someKey: '这是自定义的',
    originalIdentity: "lyy",
    browserType: 'Chrome',
    originalIdentity: "lyy",
    behaviorResult:'account_wrong',
    someKey: "a",
}
const uebaCapture = async (req, data) => {
    // const baseData = generateUEBAData(req)
    // const res = await ueba.capture({
    //     ...baseData,
    //     ...data
    // })
    const res = await ueba.capture(mockData)
    console.log(res.data);
    return res.data
}

module.exports.generateUEBAData = generateUEBAData
module.exports.uebaCapture = uebaCapture