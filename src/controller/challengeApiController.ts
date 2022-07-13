/* eslint-disable max-len */
import { Route, Controller, Get, Post, Put, Delete, Body, SuccessResponse, Path } from 'tsoa'
import { ChallengeTest } from '../services/TestChallenge'
import { EmailUser } from '../Type/InstanceConnection'

@Route('/challengeApi')
export class ChallengeApiController extends Controller {
  private challenge = ChallengeTest

  @Get('/1')
  public async firstQuestion(): Promise<any> {
    return {
      question:
        "Tu dois créer une table user avec un endpoint '/users. pour récuperer tout les utilisateur de la base. Voici les utilisateurs à enregistrer.",
      users: [
        {
          email: 'john@example.fr',
          first_name: 'john',
          last_name: 'doe'
        },
        {
          email: 'simple_user@test.fr',
          first_name: 'simple',
          last_name: 'user'
        }
      ]
    }
  }

  @Post('/1')
  public async firstAnswer(@Body() body: EmailUser): Promise<void> {
    return await this.challenge.firstQuestion(body.email)
  }

  @Get('/2')
  public async secondQuestion(): Promise<any> {
    return {
      question:
        "Tu dois créer une table user avec un endpoint '/users/<userId> avec deux methodes PUT/GET. Pour modifier un ou plusieurs champs et récuperer un utilisateur."
    }
  }

  @Post('/2')
  public async secondAnswer(@Body() body: EmailUser): Promise<any> {
    const first = await this.challenge.firstQuestion(body.email)
    if (first === true) {
      const second = await this.challenge.secondQuestion()
      if (first === true) {
        return 'Bravo tu as 20/20'
      }
    } else {
      return first
    }
  }
}
