export class Challenge {
  idChallenge: number;

  name: string;

  expirationDate: string;

  testId: number;

  constructor(idChallenge: number, name: string, expirationDate: string, testId: number) {
    this.idChallenge = idChallenge;
    this.name = name;
    this.expirationDate = expirationDate;
    this.testId = testId;
  }
}

export interface ChallengeRequest {
  name: string
  expirationDate: string
  testId: number
}
