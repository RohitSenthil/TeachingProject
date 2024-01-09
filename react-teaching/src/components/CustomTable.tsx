import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import React from 'react'

function CustomTable({ title, headings, rows }: { title: string, headings: string[], rows: any[][] }) {
    return (
        <TableContainer component={Paper} sx={{ marginTop: "1em", marginBottom: "1em" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {title}
                        </TableCell>
                        {
                            headings.map((heading) =>
                                <TableCell align="center" key={heading}>
                                    {heading}
                                </TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) =>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={row[0]}>
                                <TableCell>
                                    {row[0]}
                                </TableCell>
                                {
                                    row.slice(1).map((entry) =>
                                        <TableCell align="center" sx={{ whitespace: "pre" }} key={entry}>
                                            {entry}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        )

                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTable