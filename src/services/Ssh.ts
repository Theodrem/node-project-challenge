import { Client } from 'ssh2';
import { readFileSync } from 'fs'
import { join } from 'path'

export class SSH {
  static getSshConnection = (host: string, username: string) => {
    const privateKeyPath = join(__dirname, '..', '..', '.ssh', 'id_rsa')
    const sshClient: Client = new Client()
    sshClient.on('ready', () => {
      console.log('Client :: ready');
      sshClient.exec('uptime', (err: any, stream: any) => {
        if (err) throw err
        stream
          .on('close', (code: any, signal: any) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
            sshClient.end()
          })
          .on('data', (data: any) => {
            console.log('STDOUT: ' + data)
          })
          .stderr.on('data', (data: any) => {
            console.log('STDERR: ' + data)
          })
      })
    }).connect({
      host,
      username,
      port: 22,
      privateKey: readFileSync(privateKeyPath, { encoding: 'utf8', flag: 'r' }),
    })
  }
}
