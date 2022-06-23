import { Controller, Route, Get, Body, Exception, Post, Query, Path } from 'tsoa'
import { AdminService } from '../services/AdminService'
import { GetPromotionChallenge } from '../Type/AdminType'

@Route('admin')
export class AdminController extends Controller {
  adminService: AdminService

  constructor() {
    super()
    this.adminService = new AdminService()
  }

  @Post('/generate-excel')
  public async generateExcel(@Body() BodyRequest: GetPromotionChallenge): Promise<any> {
    return this.adminService.generateExcel(BodyRequest.promotionName, BodyRequest.challengeName)
  }
}
