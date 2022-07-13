import { Controller, Route, Get, Body, Exception, Post, Query, Path, Security } from 'tsoa'
import { AdminService } from '../services/AdminService'
import { GetPromotionChallenge } from '../types/AdminType'

@Route('admin')
export class AdminController extends Controller {
  adminService: AdminService

  constructor() {
    super()
    this.adminService = new AdminService()
  }

  @Security('jwt', ['ROLE_ADMIN'])
  @Post('/generate-excel')
  public async generateExcel(@Body() BodyRequest: GetPromotionChallenge): Promise<any> {
    return this.adminService.generateExcel(BodyRequest.promotionName, BodyRequest.challengeName)
  }

  @Security('jwt', ['ROLE_ADMIN'])
  @Get('/promotion/{param}')
  public async getPromotion(@Path() param: string | number): Promise<any> {
    return this.adminService.getPromotion(param)
  }

  @Security('jwt', ['ROLE_ADMIN'])
  @Get('/challenge/{param}')
  public async getChallenge(@Path() param: string | number): Promise<any> {
    return this.adminService.getChallenge(param)
  }
}
