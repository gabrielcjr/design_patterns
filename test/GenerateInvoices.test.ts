import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import ContractRepository from "../src/ContractRepository";
import CsvPresenter from "../src/CsvPresenter";
import DatabaseConnection from "../src/DatabaseConnection";
import GenerateInvoices from "../src/GenerateInvoices";
import PgPromiseAdapter from "../src/PgPromiseAdapter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;
let contractRepository: ContractRepository;

beforeEach(() => {
    // const contractRepository: ContractRepository = {
    //     async list(): Promise<any> {
    //         return [
    //             {
    //                 idContract: 1,
    //                 description: "",
    //                 periods: 12,
    //                 amount: "6000",
    //                 date: new Date("2025-01-01"),
    //                 payments: [
    //                     {
    //                         idPayment: 1,
    //                         date: new Date("2025-01-01"),
    //                         amount: 6000
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // }; 
    connection = new PgPromiseAdapter();
    contractRepository = new ContractDatabaseRepository(connection);
    generateInvoices = new GenerateInvoices(contractRepository);
})

test("Deve gerar as notas fiscais por regime de caixa", async function () {
    const input = {
        month: 1,
        year: 2025,
        type: "cash"
    };
    const output = await generateInvoices.execute(input);
    expect(output[0]?.date).toEqual(new Date("2025-01-01T13:00:00.000Z"));
    expect(output[0]?.amount).toBe(6000);
})

test("Deve gerar as notas fiscais por regime de competência", async function () {
    const input = {
        month: 1,
        year: 2025,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output[0]?.date).toEqual(new Date("2025-01-01T13:00:00.000Z"));
    expect(output[0]?.amount).toBe(500);
})

test("Deve gerar as notas fiscais por regime de competência", async function () {
    const input = {
        month: 2,
        year: 2025,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output[0]?.date).toEqual(new Date("2025-02-01T13:00:00.000Z"));
    expect(output[0]?.amount).toBe(500);
})

test("Deve gerar as notas fiscais por regime de competência por csv", async function () {
    const input = {
        month: 1,
        year: 2025,
        type: "accrual",
        format: "csv"
    };
    const presenter = new CsvPresenter();
    const generateInvoices = new GenerateInvoices(contractRepository, presenter);
    const output = await generateInvoices.execute(input);
    expect(output).toBe("2025-01-01;500");
})

afterEach(async () => {
    connection.close();
})