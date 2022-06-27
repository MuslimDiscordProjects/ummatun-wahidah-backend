import chalk from 'chalk';

class Logger {

    public static log(m: any, s?: string): void {
        this.rawToStdout(`${this.getLoggingDate()} ${chalk.green(s || "Application:")} ${m}`);
    }

    public static err(m: any, s?: string): void {
        this.rawToStdout(`${this.getLoggingDate()} ${chalk.red(s || "Application:")} ${chalk.red('Error:')} ${m}`);
    }

    public static rawToStdout(m: any): void {
        m = String(m)
        process.stdout.write(m + '\n');
    }

    public static getLoggingDate(): string {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
}

const log: Function = (m: string) => Logger.log(m);
const errlog: Function = (m: string) => Logger.err(m);

export { log, errlog };