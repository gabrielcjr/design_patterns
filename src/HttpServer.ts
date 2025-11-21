export default interface HttpServer {
    on (method: string, utl: string, callback: Function): void;
    listen(port: number): void;
}