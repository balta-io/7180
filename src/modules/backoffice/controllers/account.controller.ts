import { Controller, Get, UseGuards, Post, Req, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";

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
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll(@Req() request) {
        // console.log(request.user);
        return [];
    }
}