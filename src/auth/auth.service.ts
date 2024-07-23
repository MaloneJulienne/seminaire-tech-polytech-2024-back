import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    sign(payload: { email: string, sub: number }): string {
        return this.jwtService.sign(payload)
    }
}