export interface IUpdateResponse {
  rows: number
  message: string
}

export interface ICreateResponse {
  id: number
  message: string
}

export interface IUserLogged {
  status: string
  statusCode: number
  token: string
  refreshToken: string
}
