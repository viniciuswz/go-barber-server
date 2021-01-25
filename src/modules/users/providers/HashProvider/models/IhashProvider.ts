export default interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(patload: string, hashed: string): Promise<boolean>;
}
