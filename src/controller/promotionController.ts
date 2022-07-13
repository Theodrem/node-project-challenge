/* eslint-disable max-len */
import { Route, Controller, Get, Post, Put, Delete, Body, SuccessResponse, Path, Security } from 'tsoa'
import { PromotionService } from '../services/PromotionService'
import { Promotion, PromotionRequest } from '../types/PromotionType'

@Security('jwt', ['ROLE_ADMIN'])
@Route('/promotions')
export class PromotionController extends Controller {
  private promotionService = PromotionService

  @Put('/{promotionId}')
  public async editPromotion(@Path() promotionId: string, @Body() body: Partial<PromotionRequest>): Promise<void> {
    await this.promotionService.update(promotionId, body)
  }

  @Get()
  public async getPromotions(): Promise<Promotion[]> {
    return this.promotionService.getAllPromotions()
  }

  @Get('{id}')
  public async getPromotion(@Path() id: number): Promise<Promotion> {
    return this.promotionService.getOnePromotion(id)
  }

  @Post()
  @SuccessResponse(201, 'Created')
  public async createNewPromotion(@Body() body: PromotionRequest): Promise<Promotion> {
    return this.promotionService.createPromotion(body)
  }

  @Delete('{id}')
  public async deletePromotion(@Path() id: number): Promise<void> {
    await this.promotionService.delete(id)
  }
}
