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

// const mockData = {
//     appId,
//     behaviorType: 'login',
//     behaviorResult: 'account_wrong',
//     originalIdentity: username,
//     ip: "127.0.5.19"
// }

const uebaCapture = async (req, data) => {
    const baseData = generateUEBAData(req)
    const res = await ueba.capture({
        ...baseData,
        ...data
    })
    // const res = await ueba.capture(mockData)
    console.log(res.data);
    return res.data
}

module.exports.generateUEBAData = generateUEBAData
module.exports.uebaCapture = uebaCapture