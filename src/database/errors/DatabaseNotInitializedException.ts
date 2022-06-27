class DatabaseNotInitializedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseNotInitializedException";
    }
}

export default DatabaseNotInitializedException;