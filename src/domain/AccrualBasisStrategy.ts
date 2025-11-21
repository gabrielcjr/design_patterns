import Contract from "./Contract";
import Invoice from "./Invoice";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";
import moment from "moment";


export default class AccrualBasisStrategy implements InvoiceGenerationStrategy {
    generate(contract: Contract, month: number, year: number): Invoice[] {
        const invoices: Invoice[] = [];
        for (let period = 0; period < contract.periods; period++) {
            const date = moment(contract.date).add(period, "months").toDate();
            if (date.getUTCMonth() + 1 !== month || date.getUTCFullYear() !== year) continue;
            const amount = contract.amount / contract.periods;
            invoices.push(new Invoice(date, amount))
        }
        return invoices;
    }

}