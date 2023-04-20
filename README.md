# 4bit-cpu
This was an experiment in using open-AI (GPT/4, 0314) to 

1. Generate a simple chip description.
2. Generate associated simulator
3. Generate test cases to accomplish 100% coverage.

While I was trained as an electrical engineer and have some idea 
on how these things work, I have never designed a chip and all the
educations is decades in my past. So for practical purposes, I am
not much better than a monkey-with-keyboard. 

Also, I mostly work with TypeScript + node.js - so I got GPT to 
convert the code and tests to Javascript.


All the code here was generated via chat-GPT. With the exception
of adding a log message to help chat-GPT figure the problem, the 
most intelligent thing I did was copy-and-paste. 

The full [chat-GPT session is shared here](https://sharegpt.com/c/Tfyvc5S)


### Files of interest
  - [cpu.RTL](./cpu.RTL)
  - [cpu.c](./cpu.c)
  - [cpu.js](./cpu.js)
  - [cpu.test.js](./cpu.test.js)

## Test results:

```bash
❯ npm run test

> 4bit-cpu@1.0.0 test
> jest

  console.log
    Unknown opcode: 0xa

      at console.<anonymous> (node_modules/.pnpm/jest-mock@29.5.0/node_modules/jest-mock/build/index.js:709:23)

 FAIL  ./cpu.test.js
  4-bit CPU
    ✓ ADD instruction (1 ms)
    ✓ SUB instruction
    ✓ STORE instruction
    ✕ JMP instruction (1 ms)
    ✓ JZ instruction
    ✓ JC instruction
    ✓ Unknown opcode (15 ms)

  ● 4-bit CPU › JMP instruction

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 6

      87 |     loadProgram(testPrograms.jmp);
      88 |     runCPU();
    > 89 |     expect(cpu.A).toBe(1);
         |                   ^
      90 |   });
      91 |
      92 |   test("JZ instruction", () => {

      at Object.toBe (cpu.test.js:89:19)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |      94 |    83.33 |     100 |      94 |                   
 cpu.js   |      94 |    83.33 |     100 |      94 | 69-70,73-74,78-79 
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       1 failed, 6 passed, 7 total
Snapshots:   0 total
Time:        0.258 s, estimated 1 s
Ran all test suites.
```
