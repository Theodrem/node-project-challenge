export class Challenge {
  idChallenge: number;

  name: string;

  expirationDate: Date;

  idTest: number;

  constructor(idChallenge: number, name: string, expirationDate: Date, idTest: number) {
    this.idChallenge = idChallenge;
    this.name = name;
    this.expirationDate = expirationDate;
    this.idTest = idTest;
  }
}

export interface CreateChallengeRequest {
  name: string
  expirationDate: Date
  testId: number
}

export interface UpdateChallengeRequest extends Partial<CreateChallengeRequest> {

}
