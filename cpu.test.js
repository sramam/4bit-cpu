const { cpu, memory, runCPU } = require("./cpu");

const testPrograms = {
  add: [
    0x11, // LOAD A, 1
    0x22, // LOAD B, 2
    0x33, // ADD A, B
    0x90, // HLT
  ],
  sub: [
    0x11, // LOAD A, 1
    0x22, // LOAD B, 2
    0x43, // SUB A, B
    0x90, // HLT
  ],
  store: [
    0x11, // LOAD A, 1
    0x53, // STORE A, B
    0x90, // HLT
  ],
  jmp: [
    0x16, // JMP 6
    0x90, // HLT (should not be executed)
    0x11, // LOAD A, 1
    0x90, // HLT
  ],
  jz: [
    0x11, // LOAD A, 1
    0x43, // SUB A, B
    0x76, // JZ 6
    0x90, // HLT (should not be executed)
    0x11, // LOAD A, 1
    0x90, // HLT
  ],
  jc: [
    0x11, // LOAD A, 1
    0x43, // SUB A, B
    0x86, // JC 6
    0x90, // HLT (should not be executed)
    0x11, // LOAD A, 1
    0x90, // HLT
  ],
  unknownOpcode: [
    0x11, // LOAD A, 1
    0xa0, // Unknown opcode
  ],
};

describe("4-bit CPU", () => {
  beforeEach(() => {
    // Reset the CPU state before each test
    cpu.A = 0;
    cpu.B = 0;
    cpu.PC = 0;
    cpu.IR = 0;
    cpu.FLAGS = 0;
  });

  function loadProgram(program) {
    for (let i = 0; i < program.length; i++) {
      memory[i] = program[i];
    }
  }

  test("ADD instruction", () => {
    loadProgram(testPrograms.add);
    runCPU();
    expect(cpu.A).toBe(3);
    expect(cpu.B).toBe(2);
  });

  test("SUB instruction", () => {
    loadProgram(testPrograms.sub);
    runCPU();
    expect(cpu.A).toBe(15);
    expect(cpu.B).toBe(2);
  });

  test("STORE instruction", () => {
    loadProgram(testPrograms.store);
    runCPU();
    expect(cpu.A).toBe(1);
    expect(cpu.B).toBe(1);
  });

  test("JMP instruction", () => {
    loadProgram(testPrograms.jmp);
    runCPU();
    expect(cpu.A).toBe(1);
  });

  test("JZ instruction", () => {
    loadProgram(testPrograms.jz);
    runCPU();
    expect(cpu.A).toBe(1);
  });

  test("JC instruction", () => {
    loadProgram(testPrograms.jc);
    runCPU();
    expect(cpu.A).toBe(1);
  });

  test("Unknown opcode", () => {
    const consoleSpy = jest.spyOn(console, "log");
    loadProgram(testPrograms.unknownOpcode);
    runCPU();
    expect(consoleSpy).toHaveBeenCalledWith("Unknown opcode: 0xa");
    consoleSpy.mockRestore();
  });
});
