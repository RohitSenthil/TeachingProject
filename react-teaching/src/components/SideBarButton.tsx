import QuestionMark from '@mui/icons-material/QuestionMark';
import School from '@mui/icons-material/School';
import Lock from '@mui/icons-material/Lock';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from './GlobalStateProvider';
import HoverMessage from './HoverMessage';


function SideBarButton({ route, suffix, setClosed, toggle }: { route: string | undefined, suffix: string, setClosed: () => void, toggle: () => void }) {
    let navigate = useNavigate()
    const [data, updateData] = useGlobalData()
    const key = `${route?.substring(1)}${suffix ? suffix.at(1) : suffix}`
    const finished = key === "variable" || data[key] || data[Object.keys(data)[Object.keys(data).indexOf(key) - 1]]
    return (
        <HoverMessage text={"You must complete the previous sections before moving on to this section"} hide={finished}>
            <span>
                <ListItemButton onClick={() => { navigate(`${route}${suffix}`); setClosed(); toggle() }} disabled={!finished}>
                    <ListItemIcon>
                        {suffix ? <QuestionMark /> : <School />}
                    </ListItemIcon>
                    <ListItemText primary={suffix ? `Problem ${suffix.at(1)}` : "   Instruction"} />
                    {finished ? null : <Lock />}
                </ListItemButton>
            </span>
        </HoverMessage>
    )
}

export default SideBarButton