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
  statusCode: string
  token: string
  refreshToken: string
}
