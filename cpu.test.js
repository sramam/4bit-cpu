const { cpu, memory, runCPU } = require('./cpu');

describe('4-bit CPU Simulator', () => {
    beforeEach(() => {
        cpu.A = 0;
        cpu.B = 0;
        cpu.PC = 0;
        cpu.IR = 0;
        cpu.FLAGS = 0;
    });

    test('Load, Add, Sub, Store, Jump, and Halt instructions', () => {
        memory.splice(0, memory.length, ...[
            0x11, // LOAD A, 1 (A = 1)
            0x22, // LOAD B, 2 (B = 2)
            0x33, // ADD A, B  (A = 3)
            0x42, // SUB A, B  (A = 1)
            0x51, // STORE A, B (B = 1)
            0x90, // HLT (Halt the CPU)
        ]);

        runCPU();

        expect(cpu.A).toBe(1);
        expect(cpu.B).toBe(1);
    });

    test('JZ instruction when zero flag is set', () => {
        memory.splice(0, memory.length, ...[
            0x10, // LOAD A, 0 (A = 0)
            0x70, // JZ 6 (Jump to address 6 if zero flag is set)
            0x11, // LOAD A, 1 (A = 1)
            0x90, // HLT (Halt the CPU)
        ]);

        runCPU();

        expect(cpu.A).toBe(0);
    });

    test('JZ instruction when zero flag is not set', () => {
        memory.splice(0, memory.length, ...[
            0x11, // LOAD A, 1 (A = 1)
            0x70, // JZ 6 (Jump to address 6 if zero flag is set)
            0x12, // LOAD A, 2 (A = 2)
            0x90, // HLT (Halt the CPU)
        ]);

        runCPU();

        expect(cpu.A).toBe(2);
    });

    test('JC instruction when carry flag is set', () => {
        memory.splice(0, memory.length, ...[
            0x11, // LOAD A, 1 (A = 1)
            0x26, // LOAD B, 6 (B = 6)
            0x43, // SUB A, B (A = 11, Carry flag set)
            0x80, // JC 8 (Jump to address 8 if carry flag is set)
            0x12, // LOAD A, 2 (A = 2)
            0x90, // HLT (Halt the CPU)
        ]);

        runCPU();

        expect(cpu.A).toBe(11);
    });

    test('JC instruction when carry flag is not set', () => {
      memory.splice(0, memory.length, ...[
          0x11, // LOAD A, 1 (A = 1)
          0x22, // LOAD B, 2 (B = 2)
          0x33, // ADD A, B (A = 3, Carry flag not set)
          0x80, // JC 8 (Jump to address 8 if carry flag is set)
          0x14, // LOAD A, 4 (A = 4)
          0x90, // HLT (Halt the CPU)
      ]);

      runCPU();

      expect(cpu.A).toBe(4);
  });
});

