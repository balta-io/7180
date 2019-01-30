export class Query {
    constructor(
        public query: any,
        public fields: string,
        public skip: number = 0,
        public take: number = 25,
    ) {

    }
}
