import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  TokenServicePort,
  TokenPayload,
} from '../../domain/repositories/token.repository.port';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(private readonly jwtService: JwtService) {}

  // 🔐 Genera un access token válido por 15 minutos
  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  // ✅ Verifica un access token y devuelve el payload si es válido
  verifyAccessToken(token: string): TokenPayload | null {
    try {
      const tokenPayload = this.jwtService.verify(token);
      if (!tokenPayload) return null;
      return tokenPayload;
    } catch {
      return null;
    }
  }
}
