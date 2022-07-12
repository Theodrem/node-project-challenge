import * as express from 'express'
import { verify } from 'jsonwebtoken'

const config = require('../config/authConfig')

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['auth-token']
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'))
      }
      verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
          reject(err)
        } else {
          for (const scope of scopes as string[]) {
            if (scope === 'ROLE_ADMIN' && !decoded?.body?.role?.includes('ROLE_ADMIN')) { reject(new Error('REQUIRE ADMIN ROLE')) }
          }
          resolve(decoded)
        }
      })
    })
  }
}
