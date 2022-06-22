import * as express from 'express'
import { verify } from 'jsonwebtoken'
import { verifyToken } from '../services/Jwt'
const config = require('../config/authConfig')

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['Authorization']
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'))
      }
      verify(token, config.secret, function (err: any, decoded: any) {
        if (err) {
          reject(err)
        } else {
          // Check if JWT contains all required scopes
          for (let scope of scopes as string[]) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'))
            }
          }
          console.log(decoded)
          resolve(decoded)
        }
      })
    })
  }
}
