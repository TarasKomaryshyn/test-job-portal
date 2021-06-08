export interface TokenResponse {
  access_token: string;
}

export interface TokenPayload {
  email: string;
  sub: number;
}
