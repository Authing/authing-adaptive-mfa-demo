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
const uebaCapture = async (req, data) => {
    const baseData = generateUEBAData(req)
    const res = await ueba.capture({
        ...baseData,
        ...data
    })
    console.log(res.data);
    return res.data
}

module.exports.generateUEBAData = generateUEBAData
module.exports.uebaCapture = uebaCapture