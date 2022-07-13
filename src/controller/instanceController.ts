/* eslint-disable max-len */
import { Route, Controller, Get, Post, Put, Delete, Body, SuccessResponse, Path } from 'tsoa'
import { InstanceService } from '../services/InstanceService'
import { InstanceApi, EmailUser } from '../Type/InstanceConnection'

@Route('/instance')
export class InstanceController extends Controller {
  private instanceService = InstanceService

  @Post()
  public async createInstance(@Body() body: InstanceApi): Promise<void> {
    await this.instanceService.createApiInstance(body)
  }

  @Post('/ipAddress')
  public async getInstance(@Body() body: EmailUser): Promise<void> {
    return await this.instanceService.getApiAddress(body.email)
  }
}
