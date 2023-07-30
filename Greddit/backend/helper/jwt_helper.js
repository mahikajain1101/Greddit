const JWT = require('jsonwebtoken')
const createError = require('http errors')


module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve,reject) => {
            const payload = {
                
            }
            const secret = "some user secret"
            const options = {
                expiresIn: '1h',
                issuer: 'ndocen',
                audience: 'userID'


            }

            JWT.sign(payload,secret,options, (err,token) => {
                if(err) reject(err)
                resolve(error)
            })
        })
    }
}