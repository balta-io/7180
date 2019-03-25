import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) {

    }

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const user: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(user);

        let hasRole = false;
        user.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if (!hasRole) {
            throw new HttpException(
                new ResultDto('Acesso não autorizado', false, null, null),
                HttpStatus.UNAUTHORIZED);
        }

        return call$;
    }
}
