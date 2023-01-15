import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/index';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
      ) {}

    async login(dto: LoginDto) {      
        // Check user existence 
        const dbUser = await this.prisma.user.findUnique({
          where: {
              email: dto.email
          }
        })
        
        if (dbUser == null) {          
          // Create new user
          const hash = await argon.hash(dto.password);

          const user = await this.prisma.user.create({
              data: {
                email: dto.email,
                password: hash
              },
            });

          // Generate token and return user 
          return this.signToken(user.id, user.email);
        } else {    
          // Check user password 
          const passMatch = await argon.verify(dbUser.password, dto.password);

          if (!passMatch) {
            throw new ForbiddenException(
              'Incorrect credentials'
            );
          }

          // Generate token
          return this.signToken(dbUser.id, dbUser.email);
        }
    }

    async signToken(
        userId: any,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}
