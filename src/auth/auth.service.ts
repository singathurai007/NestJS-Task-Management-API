import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto.js';

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

/**
 * Auth service.
 * Demonstrates Services + Dependency Injection (ConfigService).
 *
 * In a real app this would validate credentials against a database
 * and sign a JWT. Here we mock authentication with demo users.
 */
@Injectable()
export class AuthService {
  // Demo users store (replace with a real user repository)
  private readonly users = [
    {
      id: 1,
      email: 'admin@demo.com',
      password: 'admin123',
      name: 'Admin User',
      roles: ['admin'],
    },
    {
      id: 2,
      email: 'user@demo.com',
      password: 'user123',
      name: 'Normal User',
      roles: ['user'],
    },
  ];

  constructor(private readonly configService: ConfigService) {}

  /**
   * Validate credentials and return a mock token + user.
   * The "token" here is a base64 string of the user id for demo
   * purposes only — never do this in production; use JWT.
   */
  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: AuthenticatedUser }> {
    const user = this.users.find(
      (u) => u.email === loginDto.email && u.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _password, ...safeUser } = user;
    const tokenPayload = Buffer.from(String(user.id)).toString('base64');
    const accessToken = `${tokenPayload}.${this.configService.get<string>('auth.jwtSecret')}`;

    return {
      accessToken,
      user: safeUser,
    };
  }

  /**
   * Decode a mock token back into a user. Used by AuthGuard.
   */
  validateToken(token: string): AuthenticatedUser | null {
    const [payload] = token.split('.');
    if (!payload) return null;

    const id = Buffer.from(payload, 'base64').toString('utf-8');
    const user = this.users.find((u) => u.id === Number(id));

    if (!user) return null;

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
