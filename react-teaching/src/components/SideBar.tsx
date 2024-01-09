import { ExpandLess, ExpandMore, Home, Loop, Pause, Subscript, } from '@mui/icons-material'
import { Collapse, ListItemIcon, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBarButton from './SideBarButton'
function SideBar({ open, toggle }: { open: boolean, toggle: () => void }) {
    let navigate = useNavigate()
    const [variableOpen, setVariableOpen] = useState(false)
    const [conditionalOpen, setConditionalOpen] = useState(false)
    const [loopOpen, setLoopOpen] = useState(false)

    const rows = [
        {
            text: "Home",
            icon: <Home />,
            handleClick: () => { navigate("/"); setClosed(); toggle() }
        },
        {
            text: "Variables",
            icon: <Subscript />,
            route: "/variable",
            handleClick: () => setVariableOpen(prev => !prev),
            open: variableOpen
        },
        {
            text: "Conditionals",
            icon: <Pause sx={{ transform: "rotate(90deg)" }} />,
            route: "/conditional",
            handleClick: () => setConditionalOpen(prev => !prev),
            open: conditionalOpen
        },
        {
            text: "Loop",
            icon: <Loop />,
            route: "/loop",
            handleClick: () => setLoopOpen(prev => !prev),
            open: loopOpen
        }

    ]
    const setClosed = () => {
        setVariableOpen(false)
        setConditionalOpen(false)
        setLoopOpen(false)
    }
    return (
        <>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => { toggle(); setClosed(); }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                >
                    <List>
                        <ListItem key={rows[0].text} disablePadding>
                            <ListItemButton onClick={rows[0].handleClick}>
                                <ListItemIcon>
                                    {rows[0].icon}
                                </ListItemIcon>
                                <ListItemText primary={rows[0].text} />
                            </ListItemButton>
                        </ListItem>
                        {rows.slice(1).map((row) => (
                            <React.Fragment key={row.text}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={row.handleClick}>
                                        <ListItemIcon>
                                            {row.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={row.text} />
                                        {row.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={row.open} timeout="auto" unmountOnExit key={`Content${row.text}`}>
                                    <List component="div" disablePadding>
                                        {
                                            ["", "/1", "/2", "/3"].map((suffix) => <SideBarButton route={row.route} suffix={suffix} setClosed={setClosed} toggle={toggle} key={`${row.route}${suffix}`} />)
                                        }
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}


export default SideBar