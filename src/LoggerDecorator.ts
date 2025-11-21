import UseCase from "./UseCase";

export default class LoggerDecorator implements UseCase {

    constructor(readonly useCase: UseCase) {
    }

    execute(input: any): Promise<any> {
        console.log(input);
        return this.useCase.execute(input);
    }
}