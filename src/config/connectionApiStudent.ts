import axios, { AxiosInstance } from 'axios'

export function getStudentApi(apiAddress: string): AxiosInstance {
  return axios.create({
    baseURL: apiAddress
  })
}
