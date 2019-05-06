export class User {
    constructor(
        public username: string,
        public password: string,
        public roles: string[],
        public active: boolean,
    ) {

    }
}
