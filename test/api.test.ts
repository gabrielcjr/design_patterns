import axios from "axios";

test("deve gerar as faturas pela api", async () => {
    const input = {
        month: 1,
        year: 2025,
        type: "cash"
    };
    const response = await axios.post("http://localhost:3000/generate-invoices", input);
    const output = response.data;
    expect(output[0]?.date).toEqual("2025-01-01T13:00:00.000Z");
    expect(output[0]?.amount).toBe(6000);
})