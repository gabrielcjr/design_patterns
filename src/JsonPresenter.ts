import { Output } from "./GenerateInvoices";
import Presenter from "./Presenter";

export default class JsonPresenter implements Presenter {
    async present(output: Output[]): Promise<any> {
        return output;
    }
}