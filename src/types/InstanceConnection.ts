export interface InstanceConnection {
  host: string
  username: string
  sshPublicKey: string
}

export interface InstanceApi {
  ipAddress: string
  userEmail: string
}

export interface EmailUser {
  email: string
}
