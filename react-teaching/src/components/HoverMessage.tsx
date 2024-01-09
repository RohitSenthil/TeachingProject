import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
function HoverMessage({ hide, text, children }: { hide: boolean, text: string, children: any }) {
    const [open, setOpen] = useState(false)
    return (
        <Tooltip open={open} onOpen={() => setOpen(hide ? false : true)} onClose={() => setOpen(false)} title={text}>
            {children}
        </Tooltip>
    )
}

export default HoverMessage