import Memory from "./Memory.mjs";
import Interpreter from "./interpreter.mjs";
import fs from 'fs'

const stackSize = 50;
let program = fs.readFileSync(process.argv[2]).toString().split(/[\s \n]/g); // todo change input file.
let mem = new Memory(program.length + stackSize);
for(let i = stackSize; i < stackSize + program.length; i++) {
    mem.write(program[i-stackSize], i);
}
let intpter = new Interpreter();
intpter.run(mem, stackSize);