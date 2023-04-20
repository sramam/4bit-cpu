const MEM_SIZE = 16;

let memory = [
    // Your program code goes here
];

let cpu = {
    A: 0,
    B: 0,
    PC: 0,
    IR: 0,
    FLAGS: 0
};

const CARRY_FLAG = 0x01;
const ZERO_FLAG = 0x02;

function setFlag(flag, value) {
    if (value) {
        cpu.FLAGS |= flag;
    } else {
        cpu.FLAGS &= ~flag;
    }
}

function getFlag(flag) {
    return (cpu.FLAGS & flag) !== 0;
}

function runCPU() {
    let halt = false;

    while (!halt) {
        // Fetch
        cpu.IR = memory[cpu.PC++];
        let opcode = cpu.IR >> 4;
        let imm = cpu.IR & 0x0F;

        // Decode and Execute
        switch (opcode) {
            case 0x1: // LOAD A, imm
                cpu.A = imm;
                break;
            case 0x2: // LOAD B, imm
                cpu.B = imm;
                break;
            case 0x3: // ADD A, B
                {
                    let result = cpu.A + cpu.B;
                    setFlag(CARRY_FLAG, result > 0x0F);
                    cpu.A = result & 0x0F;
                    setFlag(ZERO_FLAG, cpu.A === 0);
                }
                break;
            case 0x4: // SUB A, B
                {
                    let result = cpu.A - cpu.B;
                    setFlag(CARRY_FLAG, cpu.A < cpu.B);
                    cpu.A = result & 0x0F;
                    setFlag(ZERO_FLAG, cpu.A === 0);
                }
                break;
            case 0x5: // STORE A, B
                cpu.B = cpu.A;
                break;
            case 0x6: // JMP imm
                cpu.PC = imm;
                break;
            case 0x7: // JZ imm
                if (getFlag(ZERO_FLAG)) {
                    cpu.PC = imm;
                }
                break;
            case 0x8: // JC imm
                if (getFlag(CARRY_FLAG)) {
                    cpu.PC = imm;
                }
                break;
            case 0x9: // HLT
                halt = true;
                break;
            default:
                console.log(`Unknown opcode: 0x${opcode.toString(16)}`);
                halt = true;
                break;
        }
    }
}

// Insert your test program into the memory array and call runCPU()
// runCPU();
