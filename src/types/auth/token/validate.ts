export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  result: {
    valid: boolean;
    expiration: string;
  };
}
