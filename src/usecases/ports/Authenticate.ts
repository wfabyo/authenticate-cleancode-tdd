export interface Authenticate {
    process(login: string, password: string): Promise<string|Error>;
}