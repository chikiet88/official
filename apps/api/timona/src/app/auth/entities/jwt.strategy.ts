import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'timona') {
    constructor (private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "timona.edu.vn"
        });
    }
    async validate(payload: any) {
        return payload;
      }
}
@Injectable()
export class JwtCustomStrategy extends PassportStrategy(Strategy,'timona') {
    constructor (private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "timona.edu.vn"
        });
    }
    async validate(payload: any) {
        console.error(payload);
        return payload;        
      }
}
