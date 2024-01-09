import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DisplayCode from './DisplayCode';


function MultipleChoice({ question, answers, correct, hint, editor = "", setCompleted }: { question: string, answers: string[], correct: string, hint: string, editor: string, setCompleted: () => void }) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Choose wisely');
    const [finished, setFinished] = useState(false);
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value == correct) {
            setHelperText('You got it!');
            setError(false);
            if (!finished) {
                setCompleted()
                setFinished(true)
            }
        } else if (!value) {
            setHelperText('Please select an answer.');
            setError(true);
        }
        else if (value != correct) {
            setHelperText(hint);
            setError(true);
        }
    };
    return (
        <Container sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", justifyItems: "center" }} maxWidth={false}>
            <Typography variant='h5' color={'black'} marginBottom={'0.5em'} marginTop={'1em'} sx={{ alignSelf: "flex-start" }}>
                Check your understanding
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "45%" }}>
                <FormControl sx={{ marginTop: "1em", marginBottom: "1em", maxWidth: "100%", minWidth: "100%" }} variant="standard">
                    <FormLabel sx={{ marginBottom: "1em" }}>
                        <>
                            <Typography sx={{ color: "black" }}>{question}</Typography>
                            {editor === "" ? null : <DisplayCode value={editor} />}
                        </>
                    </FormLabel>
                    <RadioGroup
                        value={value}
                        onChange={handleRadioChange}
                    >
                        <hr style={{ width: "100%", height: "1px", border: "none", backgroundColor: "#ccc" }} />
                        {answers.map((answer, index) => {
                            return (
                                <React.Fragment key={`${index}${answer}`}>
                                    <FormControlLabel value={index + 1} control={<Radio />} label={answer} id={answer} sx={{ color: "black" }} />
                                    <hr style={{ width: "100%", height: "1px", border: "none", backgroundColor: "#ccc" }} />
                                </React.Fragment>
                            )
                        })}
                    </RadioGroup>
                    <FormHelperText required={true} sx={{ color: (error ? "error.dark" : "success.dark") }}>{helperText}</FormHelperText>
                    <Button sx={{ mt: 1, mr: 1, color: "primary.main", borderColor: "primary.main" }} type="submit" variant="outlined">
                        Check Answer
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default MultipleChoice