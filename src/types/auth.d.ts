export interface AuthProvider {
  name: string;
  icon: string;
  enabled: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}