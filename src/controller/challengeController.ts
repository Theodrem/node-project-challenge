/* eslint-disable max-len */
import {
  Route, Controller, Get, Post, Put, Delete, Body, SuccessResponse, Path,
} from 'tsoa';
import { ChallengeService } from '../services/ChallengeService';
import { Challenge, ChallengeRequest } from '../Type/ChallengeType';

@Route('/challenges')
export class ChallengeController extends Controller {
  private challengeService = ChallengeService;

  @Put('/{userId}')
  public async editChallenge(@Path() userId: string, @Body() body: Partial<ChallengeRequest>): Promise<void> {
    await this.challengeService.update(userId, body);
  }

  @Get()
  public async getChallenges(): Promise<Challenge[]> {
    return this.challengeService.getAllChallenges();
  }

  @Post()
  @SuccessResponse(201, 'Created')
  public async createNewChallenge(@Body() body: ChallengeRequest): Promise<Challenge> {
    return this.challengeService.createChallenge(body);
  }

  @Delete('{id}')
  public async deleteChallenge(@Path() id: number): Promise<void> {
    await this.challengeService.delete(id);
  }
}