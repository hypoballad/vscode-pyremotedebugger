import { EventEmitter } from 'events';

export interface FileAccessor {
    isWindows: boolean;
    readFile(path: string): Promise<Uint8Array>;
    writeFile(path: string, contents: Uint8Array): Promise<void>;
}

export interface IRuntimeBreakpoint {
    id: number;
    line: number;
    verified: boolean;
}

export class RemotePdbRuntime extends EventEmitter {

    // private _sourceFile: string = '';

    constructor(private fileAccessor: FileAccessor) {
        super();
    }

    public async start(pathMappings: { localRoot: string, remoteRoot: string }[], stopOnEntry: boolean, debug: boolean): Promise<void> {
        await this.loadSource(this.normalizePathAndCasing("sample.py"));
        console.log(pathMappings);
        if (debug) {
            // awit this.verifyBreakpoints(this._sourceFile);
        }
    }

    public step(instruction: boolean, reverse: boolean, event: string) {
        this.emit('stopOnStep');
    }

    private async loadSource(file: string): Promise<void> {
        // if (this._sourceFile !== file) {
        //     this._sourceFile = this.normalizePathAndCasing(file);
        //     this.initializeContents(await this.fileAccessor.readFile(file));
        // }
    }

    private normalizePathAndCasing(path: string) {
        if (this.fileAccessor.isWindows) {
            return path.replace(/\//g, '\\').toLowerCase();
        } else {
            return path.replace(/\\/g, '/');
        }
    }
}