
export default interface IDatabase {
    connect(): Promise<void>;
}