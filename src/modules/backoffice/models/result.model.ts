export class Result {
    constructor(
        public message: string,
        public success: boolean,
        public data: any,
        public errors: any,
    ) {

    }
}
