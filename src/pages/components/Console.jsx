import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './styles/Console.scss';
import Loader from './Loader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from '../../PrivateRoute';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Modal from './Modal';
import CircularLoader from './CircularLoader';
import { motion } from 'framer-motion';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [modalmsg, setModalmsg] = useState(false)
  const [status, setStatus] = useState(true)
  const [state, setState] = useState(false)




  useEffect(() => {
    axios.get('/api2/users')
      .then(response => {
        setRows(response.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }, [modal])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSwitchChange = (event) => {
    setState(true)
    const { name, checked } = event.target
    let id = document.getElementById(name)
    axios.post('/api2/authsignup', { "email": id.textContent, "status": checked === true ? 1 : 0 })
      .then(response => {
        setState(false)
        setModalmsg(response.data['ack'])
        setStatus(true)
        setTimeout(() => {
          setModal(true)
        }, 800)
      })
      .catch((error) => {
        setModal(true)
        setModalmsg(error.response.data['error'])
        setState(false)
        setStatus(false)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <PrivateRoute>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className='console'>
        <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} status={status} />
        <CircularLoader state={state} />
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.email}>
                  <TableCell component="th" scope="row" id={`user${row.email}`}>
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 275 }} align="left">
                    {row.user}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.role}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <FormControlLabel
                      control={
                        <Switch checked={row.status === 1 ? true : false} onChange={handleSwitchChange} name={`user${row.email}`} />
                      }
                      onChange={handleSwitchChange}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </motion.div>
    </PrivateRoute>
  );
}
