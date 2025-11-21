import Contract from "../src/domain/Contract";
import Payment from "../src/domain/Payment";

test('Deve gerar faturas de um contrato', function () {
    const contract = new Contract("", "", 6000, new Date("2025-01-01"), 12);
    const invoices = contract.generateInvoices(1, 2025, "accrual");
    expect(invoices[0].date).toEqual(new Date("2025-01-01T00:00:00.000Z"));
    expect(invoices[0].amount).toBe(500);
})

test('Deve calcular o saldo do contrato', function () {
    const contract = new Contract("", "", 6000, new Date("2025-01-01"), 12);
    contract.addPayment(new Payment("", new Date("2025-01-01"), 2000));
    expect(contract.getBalance()).toBe(4000);

})