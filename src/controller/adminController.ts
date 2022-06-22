import { Controller, Route, Get, Body, Exception, Post, Query } from 'tsoa'
import { AdminService } from '../services/AdminService'

@Route('admin')
export class AdminController extends Controller {
  adminService: AdminService

  constructor() {
    super()
    this.adminService = new AdminService()
  }

  @Get('/generate-excel')
  public async generateExel(): Promise<any> {
    return this.adminService.generateExcel()
  }
}
