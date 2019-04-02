import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken(document, email, image, roles: string[]) {
        const user: JwtPayload = {
            document: document,
            email: email,
            image: image,
            roles: roles
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // return await this.accountService.findOneByUsername(payload.username);
        return payload;
    }
}