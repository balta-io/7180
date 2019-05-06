import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
    log(message: string) {
        console.log(message);
    }

    error(message: string, trace: string) {
        console.log(message);
    }

    warn(message: string) {
        console.log(message);
    }

    debug(message: string) {
        console.log(message);
    }

    verbose(message: string) {
        console.log(message);
    }
}