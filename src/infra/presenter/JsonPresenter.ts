import { Output } from "../../application/usecase/GenerateInvoices";
import Presenter from "../../application/presenter/Presenter";

export default class JsonPresenter implements Presenter {
    async present(output: Output[]): Promise<any> {
        return output;
    }
}