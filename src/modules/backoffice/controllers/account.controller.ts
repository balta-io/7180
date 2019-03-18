import { Controller, Get, UseGuards, Post } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) {
        
    }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    findAll() {
        return [];
    }
}