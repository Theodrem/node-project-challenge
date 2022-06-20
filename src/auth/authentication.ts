import { Request } from 'express';
import { ApiError } from '../classes/ApiError';
import { ErrorCode } from '../Type/api/ErrorCode';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<boolean> {
  if (securityName === 'jwt') {
    if (!request.headers.authorization) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/missing-header', 'Missing authorization header');
    }
    // TODO: Ajoutez votre propre logique de validation JWT
  }

  return true;
}
