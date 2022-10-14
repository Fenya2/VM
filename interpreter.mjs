import Memory from "./Memory.mjs";
export default class Interpreter{
    constructor() {
        this._dict = {
            'input' : 0,
            'output' : 0,
            'add' : 0,
            'mul' : 0,
            'mov' : 0,
            'jmp' : 0,
            'cmp' : 0,
            'set' : 0,
            'sub' : 0,
        }
    };


    run(mem, ip) {
        try {
            if(!(mem instanceof Memory)) throw new TypeError("arg 'mem' of Memory.run() must be Memory.");
            if(!(Number.isInteger(ip)) || ip < 0 || ip > mem.size - 1) throw new TypeError("arg 'ip' of Memory.run() must be address of memory arg 'mem'.");
        } catch (e) {
            console.error(e.message);
            return undefined;
        }

        let curArgNum = 3;
        let eax;
        let ebx;
        let ecx;

        while(!(mem.read(ip) === "end")) {
            console.log(mem.read(ip));
            switch (mem.read(ip)) {
                case 'input':
                    mem.write(process.argv[curArgNum], mem.read(ip+1));
                    curArgNum++;
                    ip+=2;
                    break;
                case 'output':
                    console.log(mem.read(mem.read(ip+1)*1)*1);
                    ip+=2;
                    break;
                case 'add':
                    eax = mem.read(mem.read(ip+1)*1)*1;
                    ebx = mem.read(mem.read(ip+2)*1)*1;
                    try {
                        if(!Number.isFinite(eax)) throw new TypeError('args of add command works with numbers.');
                        if(!Number.isFinite(ebx)) throw new TypeError('args of add command works with numbers.');
                    } catch (e) {
                        console.error(e.message);
                        return undefined;
                    }
                    ecx = eax + ebx;
                    mem.write(ecx, mem.read(ip+3));
                    ip+=4
                    break;
                case 'mul':
                    eax = mem.read(mem.read(ip+1)*1)*1;
                    ebx = mem.read(mem.read(ip+2)*1)*1;
                    try {
                        if(!Number.isFinite(eax)) throw new TypeError('args of add command works with numbers.');
                        if(!Number.isFinite(ebx)) throw new TypeError('args of add command works with numbers.');
                    } catch (e) {
                        console.error(e.message);
                        return undefined;
                    }
                    ecx = eax * ebx;
                    mem.write(ecx, mem.read(ip+3));
                    ip+=4;
                    break;
                case 'mov':
                    eax = mem.read(ip+1)*1;
                    ebx = mem.read(mem.read(ip+2)*1)*1;
                    mem.write(ebx, eax);
                    ip+=3;
                    break;
                case 'jmp':
                    eax = mem.read(ip+1)*1; // step
                    ebx = mem.read(mem.read(ip+2)*1)*1; // flag
                    if(ebx === 0) {
                        let counter = 0;
                        while(counter < eax) {
                            if(this._dict.hasOwnProperty(mem.read(ip-1))) {
                                counter++;
                            }
                            ip--;
                        }
                        break;
                    } else if (ebx === 1) {
                        ip+=3;
                        break;
                    } else {
                        console.error('error value of jmp arg `addr`');
                        return undefined;
                    }
                    break;
                case 'cmp':
                    eax = mem.read(mem.read(ip+1)*1)*1;
                    ebx = mem.read(mem.read(ip+2)*1)*1;
                    try {
                        if(!Number.isFinite(eax)) throw new TypeError('args of add command works with numbers.');
                        if(!Number.isFinite(ebx)) throw new TypeError('args of add command works with numbers.');
                    } catch (e) {
                        console.error(e.message);
                        return undefined;
                    }
                    if(eax === ebx) mem.write(1, mem.read(ip+3));
                    else mem.write(0, mem.read(ip+3));
                    ip+=4;
                    break;
                case 'set':
                    eax = mem.read(ip+1)*1; // addr
                    ebx = mem.read(ip+2)*1; // value
                    try {
                        if(!Number.isFinite(eax)) throw new TypeError('args of add command works with numbers.');
                        if(!Number.isFinite(ebx)) throw new TypeError('args of add command works with numbers.');
                    } catch (e) {
                        console.error(e.message);
                        return undefined;
                    }
                    mem.write(ebx, eax);
                    ip+=3;
                    break;
                case 'sub':
                    eax = mem.read(mem.read(ip+1)*1)*1;
                    ebx = mem.read(mem.read(ip+2)*1)*1;
                    try {
                        if(!Number.isFinite(eax)) throw new TypeError('args of add command works with numbers.');
                        if(!Number.isFinite(ebx)) throw new TypeError('args of add command works with numbers.');
                    } catch (e) {
                        console.error(e.message);
                        return undefined;
                    }
                    ecx = eax - ebx;
                    mem.write(ecx, mem.read(ip+3));
                    ip+=4;
                    break;
            }
        }
    }
}

