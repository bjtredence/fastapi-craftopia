import { type AuthProvider } from '@/types/auth';

// Define supported authentication providers
export type Provider = 'google' | 'github' | 'facebook' | 'twitter';

// Configuration interface for auth providers
interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

// Provider configurations
const providerConfigs: Record<Provider, AuthConfig> = {
  google: {
    clientId: localStorage.getItem('GOOGLE_CLIENT_ID') || '',
    clientSecret: localStorage.getItem('GOOGLE_CLIENT_SECRET') || '',
    redirectUri: `${window.location.origin}/auth/google/callback`,
  },
  github: {
    clientId: localStorage.getItem('GITHUB_CLIENT_ID') || '',
    clientSecret: localStorage.getItem('GITHUB_CLIENT_SECRET') || '',
    redirectUri: `${window.location.origin}/auth/github/callback`,
  },
  facebook: {
    clientId: localStorage.getItem('FACEBOOK_CLIENT_ID') || '',
    clientSecret: localStorage.getItem('FACEBOOK_CLIENT_SECRET') || '',
    redirectUri: `${window.location.origin}/auth/facebook/callback`,
  },
  twitter: {
    clientId: localStorage.getItem('TWITTER_CLIENT_ID') || '',
    clientSecret: localStorage.getItem('TWITTER_CLIENT_SECRET') || '',
    redirectUri: `${window.location.origin}/auth/twitter/callback`,
  },
};

// Authentication service class
export class AuthService {
  private static instance: AuthService;
  private currentProvider: Provider | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Initialize authentication with a specific provider
  public async initAuth(provider: Provider): Promise<void> {
    this.currentProvider = provider;
    const config = providerConfigs[provider];
    
    if (!config.clientId || !config.clientSecret) {
      throw new Error(`Missing credentials for ${provider} authentication`);
    }

    const authUrl = this.getAuthorizationUrl(provider);
    window.location.href = authUrl;
  }

  // Get the authorization URL for the specified provider
  private getAuthorizationUrl(provider: Provider): string {
    const config = providerConfigs[provider];
    
    switch (provider) {
      case 'google':
        return `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
          `response_type=code&` +
          `scope=email profile`;
      
      case 'github':
        return `https://github.com/login/oauth/authorize?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
          `scope=user`;
      
      case 'facebook':
        return `https://www.facebook.com/v12.0/dialog/oauth?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
          `scope=email,public_profile`;
      
      case 'twitter':
        return `https://twitter.com/i/oauth2/authorize?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
          `response_type=code&` +
          `scope=tweet.read%20users.read`;
      
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  // Handle the authentication callback
  public async handleCallback(code: string): Promise<any> {
    if (!this.currentProvider) {
      throw new Error('No active authentication provider');
    }

    const config = providerConfigs[this.currentProvider];
    
    try {
      // Exchange the authorization code for tokens
      const response = await fetch(`/api/auth/${this.currentProvider}/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          redirectUri: config.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // Logout function
  public logout(): void {
    // Clear any stored tokens or user data
    localStorage.removeItem('auth_token');
    this.currentProvider = null;
    window.location.href = '/';
  }
}

// Export a singleton instance
export const authService = AuthService.getInstance();