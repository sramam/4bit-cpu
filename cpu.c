#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

#define MEM_SIZE 16

uint8_t memory[MEM_SIZE] = {
    // Your program code goes here
};

typedef struct {
    uint8_t A, B, PC, IR, FLAGS;
} CPU;

// Flag masks
#define CARRY_FLAG 0x01
#define ZERO_FLAG  0x02

void set_flag(CPU *cpu, uint8_t flag, bool value) {
    if (value) {
        cpu->FLAGS |= flag;
    } else {
        cpu->FLAGS &= ~flag;
    }
}

bool get_flag(CPU *cpu, uint8_t flag) {
    return (cpu->FLAGS & flag) != 0;
}

void run_cpu(CPU *cpu) {
    bool halt = false;

    while (!halt) {
        // Fetch
        cpu->IR = memory[cpu->PC++];
        uint8_t opcode = cpu->IR >> 4;
        uint8_t imm = cpu->IR & 0x0F;

        // Decode and Execute
        switch (opcode) {
            case 0x1: // LOAD A, imm
                cpu->A = imm;
                break;
            case 0x2: // LOAD B, imm
                cpu->B = imm;
                break;
            case 0x3: // ADD A, B
                {
                    uint8_t result = cpu->A + cpu->B;
                    set_flag(cpu, CARRY_FLAG, result > 0x0F);
                    cpu->A = result & 0x0F;
                    set_flag(cpu, ZERO_FLAG, cpu->A == 0);
                }
                break;
            case 0x4: // SUB A, B
                {
                    uint8_t result = cpu->A - cpu->B;
                    set_flag(cpu, CARRY_FLAG, cpu->A < cpu->B);
                    cpu->A = result & 0x0F;
                    set_flag(cpu, ZERO_FLAG, cpu->A == 0);
                }
                break;
            case 0x5: // STORE A, B
                cpu->B = cpu->A;
                break;
            case 0x6: // JMP imm
                cpu->PC = imm;
                break;
            case 0x7: // JZ imm
                if (get_flag(cpu, ZERO_FLAG)) {
                    cpu->PC = imm;
                }
                break;
            case 0x8: // JC imm
                if (get_flag(cpu, CARRY_FLAG)) {
                    cpu->PC = imm;
                }
                break;
            case 0x9: // HLT
                halt = true;
                break;
            default:
                printf("Unknown opcode: 0x%X\n", opcode);
                halt = true;
                break;
        }
    }
}

int main() {
    CPU cpu = {0};
    run_cpu(&cpu);
    return 0;
}
