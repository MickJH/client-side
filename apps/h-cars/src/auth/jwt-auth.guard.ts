// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Public routes can be accessed without a token
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = req.headers.authorization?.replace('Bearer ', '');

    console.log('Token:', token);

    if (!token) {
      return false; // No token provided
    }

    try {
      const secret = process.env.SECRET_KEY; // Retrieve secret key from environment
      const decoded = this.jwtService.verify(token, { secret });
      req.user = decoded; // Attach the user object to the request
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false; // Token is invalid
    }
  }
}
