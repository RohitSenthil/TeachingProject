const questionData = {
    variable1: {
        text: "In this course, you'll have to complete some programming problems to get familiar with the material. After all, programming skills can't be improved through theory alone, as you need to build up your problem-solving skills.\n\nThe problems are written as functions, chunks of code that can be run at any time after calling their name. A function is defined with the def keyword, then the name, then its parameters surrounded by a set of parenthesis and separated by commas. Think of parameters as variables the function has to run some logic on and give a result back. To return a result, type the return keyword and the value you want the function to give back. However, after the return is called, the function will stop and any lines of code after the return will not be run.Additionally, everything in the function must be indented, so if a line of code is aligned improperly, hit tab to make sure all of the code is consistently indented.\n\nYour first problem is simple to get you up to speed with this format: Given two parameters, num1 and num2, return the sum of both numbers. Click run once you think you've got the correct answer, and if the three boxes light up green, you can move on to the next problem. Note that any lines prefixed by a # will not be run, as they are merely comments.",
        initialCode: "def add(num1,num2):\n  #enter code below",
        key: "variable1"
    },
    variable2: {
        text: "Given a list and an index, add the value of the element in the list before the index to the value of the index. Then, insert the calculated value to the position after the index in the list and return the new list.",
        initialCode: "def insert(list,index):\n  #enter code below",
        key: "variable2"
    },
    variable3: {
        text: "Given two strings and a list, add str1 to the beginning of the list, str2 to the end of the list, and then change the middle value of the list to a concatenation(addition) of both strings. Note that for lists with an even number of items the middle of the list is the higher of the two middle indexes. For example, the middle of an index with four entries would be the third entry. (Hint - use floor division)",
        initialCode: "def swap(str1,str2,list):\n  #enter code below",
        key: "variable3"
    },
    conditional1: {
        text: "Given a number, if the number is divisible by 3, return \"Fizz\". If the number is divisible by 5, return \"Buzz\". If the number is divisble by both 5 and 3, return \"FizzBuzz\"If the number meets none of those requirements return, \"None\"",
        initialCode: "def fizzbuzz(num):\n  #enter code below",
        key: "conditional1"
    },
    conditional2: {
        text: "Given a number, if the number is greater than 1000, return \"Expensive\". If the item is less than 1000 but greater than 500, return \"Pricey\". If the number is less than or equal to 500 and greater than 300, return \"Good Price\". If the number is less than 300, return \"Cheap\"",
        initialCode: "def price(num):\n  #enter code below",
        key: "conditional2"
    },
    conditional3: {
        text: "Given a number, return a magic-ball response. Depending on the number, return one of these responses:\ \"It is certain.\", \ \"It is decidedly so.\",\ \"Without a doubt.\",\ \"Yes.\",\ \"Reply hazy, try again.\",\ \"Ask again later.\",\ \"Don't count on it.\",\ \"My reply is no.\",\ \"Very doubtful.\". If the number is one it corresponds with the first response, if it's two it corresponds to the second response etc. If the number falls outside the range of the answers, return \"Wrong Number\".",
        initialCode: "def magic(num):\n  #enter code below",
        key: "conditional3"
    },
    loop1: {
        text: "Given a number, loop through the numbers from one to the number inclusive and find their fizzbuzz answers. As a reminder, the fizzbuzz rules are: If the number is divisible by 3, return \"Fizz\". If the number is divisible by 5, return \"Buzz\". If the number is divisble by both 5 and 3, return \"FizzBuzz\". If the number meets none of those requirements, return \"None\". Add the output of the fizzbuzzes to a list and return it.",
        initialCode: "def fizzbuzz2(num):\n  #enter code below",
        key: "loop1"
    },
    loop2: {
        text: "Given a number, apply these rules until it finally reaches 1. If the number is even, divide it by 2 and if the number is odd, multiply it by 3 and add 1. Return the number of iterations(loops) it takes for the number to reach 1",
        initialCode: "def collatz(num):\n  #enter code below",
        key: "loop2"
    },
    loop3: {
        text: "Given a list, loop through the list and return the index of the smallest value.",
        initialCode: "def minimum(list):\n  #enter code below",
        key: "loop3"
    }
}
export default questionData