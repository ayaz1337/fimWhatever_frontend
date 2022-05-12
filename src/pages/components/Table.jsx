import React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import $ from 'jquery';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#7DA0FA",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ({ rows }) {
    const handleSearchChange = (event) => {
        const val = document.querySelector(`#${event.target.id}`).value.toUpperCase();
        if (val.length > 0 && val != "") {
            $('body').addClass('stop-scrolling')
            $('.table').css('min-height', "100vh")
        }
        else {
            $('body').removeClass('stop-scrolling')
        }
        let tr = document.querySelectorAll("#table__row");
        for (let i = 0; i < tr.length; i++) {
            let file = tr[i].getElementsByClassName("table__data")[0]
            if (file.textContent.toUpperCase().indexOf(val) > -1) {
                tr[i].style.display = ""
            }
            else {
                tr[i].style.display = "none"
            }
        }
    }

    const handleBlur = () => {
        $('body').removeClass('stop-scrolling')
        $('.table').css('min-height', "auto")
    }

    const handleStatus = (status) => {
        switch (status) {
            case 2:
              return ['success', 'Integrity Safe', '#edf7ed']
            case 3:
              return ['error', 'Integrity Compromised', '#fdeded']
            case 4:
              return ['warning', 'Removed', '#fff4e5']
            default:
              return ['info', 'Encrypted', '']
          }
    }
    return (
        <>
            <Paper
                component="box"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
            >
                <InputBase
                    onBlur={handleBlur}
                    onChange={handleSearchChange}
                    id="search__table"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TableContainer component={Paper} className="table_container">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell align="center" >File Id</StyledTableCell>
                            <StyledTableCell align="left">File Path</StyledTableCell>
                            <StyledTableCell align="left">File Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.file_id} id="table__row">
                                <StyledTableCell component="th" scope="row" align="center" >
                                    {row.file_id}
                                </StyledTableCell>
                                <StyledTableCell align="left" className='table__data'>{row.file}</StyledTableCell>
                                <StyledTableCell align="left"><Alert severity={handleStatus(row.status)[0]} className="alert"></Alert></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
