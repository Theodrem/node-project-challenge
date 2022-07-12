export class Promotion {
  idPromotion: number
  name: string

  constructor(idChallenge: number, name: string) {
    this.idPromotion = idChallenge
    this.name = name
  }
}

export interface PromotionRequest {
  name: string
}
