import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import React, { useEffect, useRef, useState } from 'react'
import MultipleChoice from '../components/MultipleChoice'
import VariableAnimation from '../components/VariableAnimation'
import CustomTable from '../components/CustomTable'
import DisplayCode from '../components/DisplayCode'
import ListAnimation from '../components/ListAnimation'
import BottomBar from '../components/BottomBar'
import { useGlobalData } from '../components/GlobalStateProvider'
function VariableInstructionPage() {
    const [completed, setCompleted] = useState(0)
    const [data, setData] = useGlobalData()
    useEffect(() => {
        if (completed === 4) {
            localStorage.setItem("variable", "finished")
            setData("variable", "finished")
        }
    }, [completed])
    const containerRef = useRef<any>(null)
    const [bottom, setBottom] = useState(false)
    const checkBottom = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const atBottom = Math.abs((scrollHeight - scrollTop) - clientHeight) < 1
            if (atBottom) {
                setBottom(true)
            }
            else if (bottom == false) {
                return
            }
            else {
                setBottom(false)
            }
        }
    };
    return (
        <>
            <Container
                sx={{ backgroundColor: "#D5D7DB", overflow: "auto", minWidth: "100%", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }} ref={containerRef} onScroll={checkBottom}>
                <Container sx={{ backgroundColor: "white", maxWidth: "75%", paddingBottom: "3em", boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} maxWidth={false}>
                    <Typography variant='h2' color={'black'} marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Variables
                    </Typography>
                    <Typography variant='h5' color={'black'} >
                        Variables are the most essential element of any programming language and are the foundation of any program you'll write. In simplest terms, variables are containers for a value you want to keep track of. Each variable has a name used to reference them and a specific value they hold. To declare a variable in Python, type a name, then an equals sign, and finally, the value you want that variable to store. In the animation below, the variable's name is x, and its value is 2. To see a variable's value, type print(variableName); to use its value, use its name in any expression. To reassign a variable, type its name, an equals sign, and its new value.
                    </Typography>
                    <VariableAnimation setCompleted={() => setCompleted(prev => prev + 1)} />
                    <MultipleChoice question={"What is the value of the variable in this line of code?"} answers={[
                        "y=8",
                        "8",
                        "y",
                        "Y"
                    ]} correct={"2"} hint={"Remember, the value comes after the equal sign"} editor={"y=8"} setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Data Types
                    </Typography>
                    <Typography variant="h5" color="black">
                        Variables hold specific values by allocating a portion of memory to store those values and then assigning the name to that portion of memory. When a variable's name is referenced, the computer checks the name, looks up where the stored value is, and then returns the value. Computers only understand a few specific data types, so you can't type out any value and expect the program to work; you can only use the specific data types listed in the table below.
                    </Typography>
                    <CustomTable title="Types of variables" headings={["What they are", "How to spot them", "Examples"]} rows={[["Integer", "Whole Numbers", "Look for whole numbers", <DisplayCode value="x=2" />], ["Float", "Decimal Numbers", "Look for decimal points", <DisplayCode value="y=2.8" />], ["Strings", "Text", " Look for quotations surrounding words- \" or \'", <DisplayCode value={"z=\"Hi\""} />], ["Boolean", "True/False", "Booleans can only be True or False, but look out for quotations to make sure they're not strings", <DisplayCode value={"a=False"} />]]} />
                    <MultipleChoice question={"What type of variable is b?"} answers={[
                        "Int",
                        "Float",
                        "String",
                        "Boolean"
                    ]} correct={"3"} hint={"Look at the table"} editor={"b=\"True\""} setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Operations
                    </Typography>
                    <Typography variant="h5" color="black">
                        The primary purpose of variables is to hold values to perform operations on, and listed below are the main mathematical operations you will perform on variables. Just as PEMDAS is used to see which operations to do first, the table lists the operations from highest to lowest priority, so higher operations will be done over lower operations.
                    </Typography>
                    <CustomTable title="Operations" headings={["Symbol", "Example"]} rows={[["Exponent", "**", <DisplayCode value={"x=4\ny=2\nz=x**y\nprint(z) #->16\n#Syntax is base ** exponent"} />], ["Remainder (modulus)", "%", <DisplayCode value={"x=5\ny=2\nz=x%y\nprint(z) #->4\n#5 doesn't divide into 2 cleanly, 2*2=4 but 2*3=6. If you do long division, you'll see there is a remainder is 1, so that's what the operation returns"} />],
                    ["Floor Division", "//", <DisplayCode value={"x=7\ny=2\nz=x // y\nprint(z) #->3\n#7 divided by 2 is 3.5. The floor operator truncates (throws away) any decimal places and returns the integer 3."} />], ["Division", "/", <DisplayCode value={"x=8\ny=2\nz=x/y\nprint(z) #->4"} />], ["Multiplication", "*", <DisplayCode value={"x=2\ny=3\nz=x*y\nprint(z) #->6"} />], ["Subtraction", "-", <DisplayCode value={"x=2\ny=1\nz=x-y\nprint(z) #->1"} />], ["Addition", "+", <DisplayCode value={"x=1\ny=2\nz=x+y\nprint(z) #->3"} />],]} />
                    <Typography variant="h5" color="black" marginTop="1em" marginBottom="1em">
                        By adding an equals sign after the operation, you can assign a variable to the calculated value of an operation performed on it.                     </Typography>
                    <Typography variant="h5" color="black">
                        Example
                    </Typography>
                    <DisplayCode value={"x=2\nx*=3\nprint(x)\n#->x is 2, so x*3=6. By adding an equals sign after the operation, we set x equal to the calculated value of 6"} />
                    <Typography variant="h5" color="black">
                        While it may seem like all these operations can only be done with numbers, the addition and multiplication operations can actually be performed on strings. Doing the + operation on a string will join(concatenate) them together, and doing the * operation on a string will duplicate the string. However, the other operations cannot be done on strings, and attempting to use them on strings will crash the program.
                    </Typography>
                    <Container sx={{ display: "flex", maxWidth: "100%", justifyContent: "space-evenly", marginTop: "1em", marginBottom: "1em" }}>
                        <Container sx={{ maxWidth: "45%" }}>
                            <Typography variant="h5" color="black">
                                Adding Strings
                            </Typography>
                            <DisplayCode value={"x=\"Hello\"\ny=\" World\"\nprint(x+y) # -> Hello World"} />
                        </Container>
                        <Container sx={{ maxWidth: "45%" }}>
                            <Typography variant="h5" color="black">
                                Multiplying Strings
                            </Typography>
                            <DisplayCode value={"x=\"Hello\"\ny=4\nprint(x*y) # -> HelloHelloHelloHello"} />
                        </Container>
                    </Container>
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Lists
                    </Typography>
                    <Typography variant="h5" color="black" whiteSpace={"pre-wrap"}>
                        {"Lists hold a group of variables in order. You declare an list with square brackets, [  ], and seperate each value stored in the list with a comma. For example, to make a variable that holds the number one through five, the code is: numbers=[1, 2, 3, 4, 5]. Each value in the list has an index used to access it, but be careful; the index starts at 0 and not 1. This means the first value in the list has an index of zero, the second value in the list has an index of one, etc. To access a specific value, type the name of the list, then put the index of the value in brackets right after the name using the syntax name[index]. For example, to get the value 2 from the numbers list, you'd type out numbers[1]. Be careful when accessing a value, as trying to access an index not in the list will crash the program. To change a value in the list, use the syntax name[index] = newValue to change that specific value.\n\nTo add an element to an list, do a name.append(newValue) to add the new value to the end of the list, or do an name.insert(index,  newValue) to insert the new value at a  specific index, which will shift over the values to the right by one. To remove a value from the index, do a name.remove(value) to remove that specific value from the list. To get the length of a list, write out len(listName) to get the elements of the list, but remember that because index starts at 0, the last index of the list will be 1 less than the length of the list. To get the index of a particular element, use the syntax name.index(value). This will return the index of that value in the list. Be careful, as trying to get the index of a value not in the list will crash the program."}
                    </Typography>
                    <ListAnimation setCompleted={() => setCompleted(prev => prev + 1)} />
                </Container>
            </Container>
            <Container sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 8000 }} disableGutters={true} maxWidth={false}>
                <BottomBar position={0} show={data["variable"] || bottom} />
            </Container>
        </>
    )
}

export default VariableInstructionPage