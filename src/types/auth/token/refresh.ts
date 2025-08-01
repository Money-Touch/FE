export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}
