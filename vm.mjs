import Memory from "./Memory.mjs";
import Processor from "./Processor.mjs";
import fs from 'fs'
const stackSize = 50;

let filename = process.argv[2];
try {
    if(filename.slice(-4) !== '.aal') throw new TypeError('extension of executable file must be ".aal"');
    let program = fs.readFileSync(filename).toString().replace(/;.*\n/g, ''); //delete comments.
    program = program.replace(/\n+/g, '\n'); //delete \n repeats.
    program = program.split(/[\s \n]/g); // split for write to memory.
    let ram = new Memory(program.length + stackSize);
    for(let i = stackSize; i < stackSize + program.length; i++) {
        ram.write(i, program[i-stackSize]);
    }
    let cpu = new Processor();
    cpu.run(ram, stackSize);
} catch (e) {
    console.error(e.message);
}
