const tests = {
    variable1: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tb = int(sys.argv[2])\n\tcorrect = int(sys.argv[3])\n\tprint(add(a, b) == correct)\n\tprint(add(a, b))",
        arguments: {
            1: [1, 2, 3],
            2: [2, 2, 4],
            3: [2, -2, 0],
        }
    },
    variable2: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = list(map(int, sys.argv[1].strip('[]').split(',')))\n\ta2=a.copy()\n\tb = int(sys.argv[2])\n\tcorrect = list(map(int, sys.argv[3].strip('[]').split(',')))\n\tprint(insert(a, b) == correct)\n\tprint(insert(a2, b))",
        arguments: {
            1: ["[1,2,3]", 1, "[1,2,2,3]"],
            2: ["[7,6,0,-4,-3]", 3, "[7,6,0,-4,3,-3]"],
            3: ["[0,0,0,0,0]", 2, "[0,0,0,2,0,0]"],
        }
    },
    variable3: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = str(sys.argv[1])\n\tb = str(sys.argv[2])\n\tc = list(map(str, sys.argv[3].strip('[]').split(',')))\n\tc2=c.copy()\n\tcorrect = list(map(str, sys.argv[4].strip('[]').split(',')))\n\tprint(swap(a, b, c) == correct)\n\tprint(swap(a, b, c2))",
        arguments: {
            1: ["Hello", "Hi", "[GoodMorning,Hola,WhatsUp]", "[Hello,GoodMorning,HelloHi,WhatsUp,Hi]"],
            2: ["A", "B", "[C,D,E,F]", "[A,C,D,AB,F,B]"],
            3: ["15", "27", "[17,27,56,92,65,39]", "[15,17,27,56,1527,65,39,27]"],
        }
    },
    conditional1: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tcorrect = str(sys.argv[2])\n\tprint(fizzbuzz(a) == correct)\n\tprint(fizzbuzz(a))",
        arguments: {
            1: ["27", "Fizz"],
            2: ["7", "None"],
            3: ["15", "FizzBuzz"],
        }
    },
    conditional2: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tcorrect = str(sys.argv[2])\n\tprint(price(a) == correct)\n\tprint(price(a))",
        arguments: {
            1: ["1500", "Expensive"],
            2: ["500", "Good Price"],
            3: ["800", "Pricey"],
        }
    },
    conditional3: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tcorrect = str(sys.argv[2])\n\tprint(magic(a) == correct)\n\tprint(magic(a))",
        arguments: {
            1: ["4", "Yes."],
            2: ["8", "My reply is no."],
            3: ["0", "Wrong Number"],
        }
    },
    loop1: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tcorrect = list(map(str, sys.argv[2].strip('[]').split(',')))\n\tprint(fizzbuzz2(a) == correct)\n\tprint(fizzbuzz2(a))",
        arguments: {
            1: ["10", "[None,None,Fizz,None,Buzz,Fizz,None,None,Fizz,Buzz]"],
            2: ["5", "[None,None,Fizz,None,Buzz]"],
            3: ["8", "[None,None,Fizz,None,Buzz,Fizz,None,None]"],
        }
    },
    loop2: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = int(sys.argv[1])\n\tcorrect = int(sys.argv[2])\n\tprint(collatz(a) == correct)\n\tprint(collatz(a))",
        arguments: {
            1: ["5", "5"],
            2: ["10", "6"],
            3: ["13", "9"],
        }
    },
    loop3: {
        ending: "\n\nif __name__ == \"__main__\":\n\ta = list(map(int, sys.argv[1].strip('[]').split(',')))\n\tcorrect = int(sys.argv[2])\n\tprint(minimum(a) == correct)\n\tprint(minimum(a))",
        arguments: {
            1: ["[5,4,3,2,1]", "4"],
            2: ["[8,0,-3,7,5]", "2"],
            3: ["[0,3,4,5,9]", "0"],
        }
    },
};
module.exports = tests