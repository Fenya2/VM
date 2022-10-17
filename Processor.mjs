import Memory from "./Memory.mjs";
export default class Processor {
    constructor() {
        this.ip = 0;
        this.rax = 0;
        this.rbx = 0;
        this.rcx = 0;
        this.tag = '';
        this.cur_input = 3;
        this.dict = {
            'input' : 0,
            'output' : 0,
            'add' : 0,
            'mul' : 0,
            'sub' : 0,
            'mod' : 0,
            'div' : 0,
            'eq' : 0,
            'more' : 0,
            'less' : 0,
            'jmp' : 0,
            'end' : 0,
            'mov' : 0,
        }
    }
    run(memory, stackSize) {
        this.ip = stackSize;
        while(memory.read(this.ip) !== 'end') {
            //console.log(this.ip, memory.read(this.ip));
            switch (memory.read(this.ip)) {
                case 'input':
                    memory.write(memory.read(this.ip+1)*1, process.argv[this.cur_input]);
                    this.cur_input++;
                    this.ip += 2;
                    break;
                case 'output':
                    console.log(memory.read(memory.read(this.ip+1)*1)*1);
                    this.ip += 2;
                    break;
                case 'add':
                case 'mul':
                case 'sub':
                case 'mod':
                case 'div':
                    this.rax = memory.read(this.ip+1)*1; // address
                    this.rbx = memory.read(this.ip+2).toString();
                    this.rcx = memory.read(this.ip+3).toString();

                    if(this.rbx[0] === '!') {
                        this.rbx = this.rbx.replace('!', '')*1;
                    }
                    else this.rbx = memory.read(this.rbx)*1;

                    if(this.rcx[0] === '!') {
                        this.rcx = this.rcx.replace('!', '')*1;
                    }
                    else this.rcx = memory.read(this.rcx)*1;
                        switch (memory.read(this.ip)) {
                            case 'add':
                                memory.write(this.rax, this.rbx + this.rcx);
                                break;
                            case 'mul':
                                memory.write(this.rax, this.rbx * this.rcx);
                                break;
                            case 'sub':
                                memory.write(this.rax, this.rbx - this.rcx);
                                break;
                            case 'mod':
                                memory.write(this.rax, this.rbx % this.rcx);
                                break;
                            case 'div':
                                memory.write(this.rax, this.rbx / this.rcx);
                                break;
                        }
                        this.ip+=4;
                    break;
                case 'eq':
                case 'more':
                case 'less':
                    //console.log('enter in eq');
                    this.rax = memory.read(this.ip + 1).toString();
                    this.rbx = memory.read(this.ip + 2).toString();
                    if(this.rax[0] === '!') {
                        this.rax = this.rax.replace('!', '')*1;
                    }
                    else this.rax = memory.read(this.rax)*1;

                    if(this.rbx[0] === '!') {
                        this.rbx = this.rbx.replace('!', '')*1;
                    }
                    else this.rbx = memory.read(this.rbx)*1;

                    //console.log('rax:',this.rax);
                    //console.log('rbx:',this.rbx);
                    switch (memory.read(this.ip)){
                        case 'eq':
                            if(this.rax !== this.rbx) this.ip+=3;
                            else {
                                this.ip+=4;
                                while(!this.dict.hasOwnProperty(memory.read(this.ip))) {
                                    this.ip++;
                                }
                            }
                            //console.log(memory.read(this.ip));
                            break;
                        case 'more':
                            if(!(this.rax > this.rbx)) this.ip+=3;
                            else {
                                this.ip+=4;
                                while(!this.dict.hasOwnProperty(memory.read(this.ip))) {
                                    this.ip++;
                                }
                            }
                            break;
                        case 'less':
                            if(!(this.rax < this.rbx)) this.ip+=3;
                            else {
                                this.ip+=4;
                                while(!this.dict.hasOwnProperty(memory.read(this.ip))) {
                                    this.ip++;
                                }
                            }
                            break;
                    }
                    break;
                case 'jmp':
                    this.tag = memory.read(this.ip+1) + ':';
                    let i = stackSize;
                    while (memory.read(i) !== this.tag) i++;
                    this.ip = i;
                    break;
                case 'mov':
                    this.rax = memory.read(this.ip + 1); // address
                    this.rbx = memory.read(this.ip + 2).toString();

                    if(this.rbx[0] === '!') {
                        this.rbx = this.rbx.replace('!', '')*1;
                    }
                    else this.rbx = memory.read(this.rbx)*1;
                    memory.write(this.rax, this.rbx);
                    this.ip+=3;
                    break;
                default:
                    this.ip++;
                    break;
            }
        }
    }
}

