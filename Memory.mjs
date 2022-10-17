export default class Memory{
    constructor(size) {
        try {
            if(!Number.isInteger(size))
                throw new TypeError("arg of Memory.constructor() must be Integer");
        } catch (e) {
                console.log(e.message);
                return undefined;
        }
        this._memory = new Array(size);
        this._size = this._memory.length;
    }
    write(addr, val) {
        addr = Number(addr);
        try{
            if (!Number.isInteger(addr) || addr < 0 || addr > this._size-1)
                throw new TypeError("arg 'addr' of Memory.read() must be address in Memory");
        } catch (e) {
            console.log(e.message);
            return undefined;
        }
        this._memory[addr] = val;
        return true;
    }
    read(addr) {
        addr = Number(addr);
        try {
            if(!Number.isInteger(addr) || addr < 0 || addr > this._memory.length-1)
                throw new TypeError("arg of Memory.read() must be address in Memory");
        } catch (e) {
            console.log(e.message);
            return undefined;
        }
        return this._memory[addr];
    }
    getMemory() {
        return this._memory;
    }
}