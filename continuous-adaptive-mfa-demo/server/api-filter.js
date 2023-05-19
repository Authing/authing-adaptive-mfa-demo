const { uebaCapture } = require('./ueba')
const axios = require('axios')
const {authingManagementClient, userPoolId, token: authingToken} = require('./authing-client')

module.exports = async (req, res, next) => {
    console.log('Time:', Date.now())
    if(req.originalUrl === '/api/login') {
        next()
        return
    }
    const token = req.cookies['token'];
    if (token === null || token.length === 0) {
        res.sendStatus(401);
        return
    }
    const user = JSON.parse(token)
    req.user = user

    const {data: authingUser} = await axios.get('https://console.wh.authing-inc.co/api/v3/get-mfa-status', { params: {
            userId: user.username,
            userIdType: 'username',
        },
        headers: {
            "x-authing-userpool-id": userPoolId,
            authorization: authingToken
        }
    })
    if(authingUser.data) {
        res.send({
            mfaTriggerData: {
                ...authingUser.data,
                applicationMfa: [ { mfaPolicy: 'SMS', sort: 1, status: 1 } ],
            }
        })
        return
    }
    next()
    // uebaCapture(req, {
    //     behaviorType: 'access',
    //     behaviorResult: 'success',
    //     originalIdentity: user.username
    // })
}