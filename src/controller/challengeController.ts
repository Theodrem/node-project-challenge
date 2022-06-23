/* eslint-disable max-len */
import {
  Route, Controller, Get, Post, Put, Delete, Body, SuccessResponse, Path,
} from 'tsoa';
import { ChallengeService } from '../services/ChallengeService';
import { Challenge, CreateChallengeRequest, UpdateChallengeRequest } from '../Type/ChallengeType';

@Route('challenge')
export class ChallengeController extends Controller {
  private challengeService = ChallengeService;

  @Get()
  public async getChallenges(): Promise<Challenge[]> {
    return this.challengeService.getAllChallenges();
  }

  @Post()
  @SuccessResponse('201', 'Created')
  public async createNewChallenge(@Body() body: CreateChallengeRequest): Promise<Challenge> {
    const newChallenge = await this.challengeService.createChallenge(body);
    return newChallenge;
  }

  @Put('{id}')
  public async editChallenge(@Path() id: number, @Body() body: UpdateChallengeRequest): Promise<void> {
    console.log(id, body);
    return this.challengeService.update(id, body);
  }

  @Delete('{id}')
  public async deleteChallenge(@Path() id: number) {
    console.log(id);
    this.challengeService.delete(id);
  }
}
