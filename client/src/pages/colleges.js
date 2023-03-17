import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../UserContext"
import axios from '../api/axios';

import { CircularProgress, Typography, Button, Radio, RadioGroup, FormControlLabel, Slider } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, MenuItem, Grow, Stack, Alert, Divider } from '@mui/material';

import texturedImage from "../images/textured_3_edit.png";
const COLLEGES_URL = '/api/v1/colleges';

const columns = [
    { id: 'index', label: "No.", minWidth: 60 },
    { id: 'cname', label: 'College Name', minWidth: 250 },
    { id: 'uname', label: 'University Name', minWidth: 250 },
    { id: 'state', label: 'State', minWidth: 100 },
    {
        id: 'estd',
        label: 'Established',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toFixed(0),
    },
    {
        id: 'intake',
        label: 'Annual Seat Intake',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Status Of NMC\/MCI',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'fee',
        label: 'Tuition Fee (Gen.) in Rs. P.a',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-IN'),
    },
    {
        id: 'grad',
        label: 'Graduation',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-IN'),
    },
    {
        id: 'category',
        label: 'Category',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-IN'),
    }
];

function createData(index, cname, uname, state, estd, intake, status, fee, grad, category) {
    intake = parseInt(intake);
    fee = parseInt(fee);
    return { index, cname, uname, state, estd, intake, status, fee, grad, category };
}
var rows = [];

const Colleges = ({ navbar, setNavbar }) => {
    const [collegeRows, setCollegeRows] = useState([]);
    const { user, setUser, cookieToken, setCookieToken } = useContext(UserContext);
    useEffect(() => {
        setNavbar(true);
        axios.get(COLLEGES_URL, {
            headers: {
                Authorization: `Bearer ${cookieToken}`
            }
        })
            .then((res) => {
                rows = [];
                res.data.colleges.map((College, index) => {
                    rows.push(createData(index + 1, College.COLLEGE_NAME, College.UNIVERSITY_NAME, College.STATE, College.ESTD, College.INTAKE, College.STATUS, College.FEE, College.GRAD, College.CATEGORY));
                })
                setCollegeRows(rows);
                setPermanentRows(rows);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [state, setState] = useState('');
    const [category, setCategory] = useState('');
    const [graduation, setGraduation] = useState('');
    const [fee, setFee] = useState(2000000);
    const [collegeSearch, setCollegeSearch] = useState('');
    const [permanentRows, setPermanentRows] = useState(rows);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const [gotCollege, setGotCollege] = useState(true);

    const handleFilterChange = async (e) => {
        setGotCollege(true);
        setPage(0);
        e.preventDefault();
        try {
            var response = '';
            if (graduation === '') {
                alert("Select Graduation");
            }
            else {
                setCollegeRows([]);
                if (state === '') {
                    if (category === '') {
                        response = await axios.get(`${COLLEGES_URL}?GRAD=${graduation}&FEE[lte]=${fee}`);
                    }
                    else {
                        response = await axios.get(`${COLLEGES_URL}?GRAD=${graduation}&FEE[lte]=${fee}&CATEGORY=${category}`);
                    }
                }
                else {
                    if (category === '') {
                        response = await axios.get(`${COLLEGES_URL}?STATE=${state}&GRAD=${graduation}&FEE[lte]=${fee}`);
                    }
                    else {
                        response = await axios.get(`${COLLEGES_URL}?GRAD=${graduation}&FEE[lte]=${fee}&STATE=${state}&CATEGORY=${category}`);
                    }
                }
                if (response.data.colleges.length === 0) {
                    setGotCollege(false);
                }
                rows = [];
                response.data.colleges.map((College, index) => {
                    rows.push(createData(index + 1, College.COLLEGE_NAME, College.UNIVERSITY_NAME, College.STATE, College.ESTD, College.INTAKE, College.STATUS, College.FEE, College.GRAD, College.CATEGORY));
                })
                setCollegeRows(rows);
                setPermanentRows(rows);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function valuetext(value) {
        return `${value}`;
    }

    useEffect(() => {
        let tempRows = permanentRows;
        rows = [];
        tempRows.filter((val) => {
            if (collegeSearch === "" || collegeSearch === null) {
                return val;
            }
            else if (val.cname.toLowerCase().includes(collegeSearch.toLowerCase())) {
                return val;
            }
        }).map((val, key) => {
            rows.push(val);
        })
        setCollegeRows(rows);
    }, [collegeSearch])

    return (
        <Paper sx={{ margin: "80px auto", width: '95%' }}>
            <Typography align="center" variant="h4" style={{ fontFamily: "Nunito Sans", fontWeight: "600", color: "orange", textShadow: "1px 1px 2px black" }}>College List</Typography>
            <Divider sx={{ borderTop: "2px solid", margin: "10px 80px 0px 80px", color: "orange" }} />
            <Paper style={{ margin: '10px 0px 10px 0px' }}>
                <Typography align="left" variant="h5" style={{ fontFamily: "Nunito Sans", fontWeight: "600", color: "orange", margin: '10px 0px 0px 10px' }}>
                    Apply College Filters
                </Typography>
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: '20px' }} onSubmit={handleFilterChange}>
                    <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>Select Maximum Fees</Typography>
                        <Slider
                            aria-label="Tuition Fee"
                            defaultValue={2000000}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            valueLabelFormat={fee.toLocaleString('en-IN')}
                            step={200000}
                            marks
                            min={1000000}
                            max={9999999}
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                        />
                        <Typography>{fee}</Typography>
                    </div>
                    <div style={{ display: "flex",flexWrap: "wrap", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: '20px' }}>
                        <TextField
                            style={{ margin: "15px", minWidth: "150px", height: "50px" }}
                            select
                            label="Select State"
                            value={state}
                            onChange={e => setState(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Gujarat">Gujarat</MenuItem>
                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                            <MenuItem value="Delhi">Delhi</MenuItem>
                            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                            <MenuItem value="Haryana">Haryana</MenuItem>
                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                            <MenuItem value="Kerala">Kerala</MenuItem>
                        </TextField>
                        <TextField
                            style={{margin:'15px', minWidth: "160px", height: "50px" }}
                            select
                            label="Select Category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Deemed">Deemed</MenuItem>
                            <MenuItem value="Government">Government</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                        </TextField>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={graduation}
                            onChange={e => setGraduation(e.target.value)}
                        >
                            <FormControlLabel value="UG" control={<Radio />} label="UG" />
                            <FormControlLabel value="PG" control={<Radio />} label="PG" />
                        </RadioGroup>
                        <Button type="submit" style={{ fontFamily: "Nunito Sans", fontWeight: "600", backgroundColor: "whiteorange", boxShadow: "0px 0px 2px 2px orange", height: "100%", padding: "7px" }}>Search</Button>
                    </div>
                </form>
            </Paper>
            <Paper style={{ margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography align="left" variant="h5" style={{ fontFamily: "Nunito Sans", fontWeight: "600", color: "orange", margin: '10px 0px 0px 10px' }}>
                    Search College
                </Typography>
                <TextField label="Enter College Name" variant="outlined"
                    style={{
                        margin: '0px 10px 10px 0px',
                        width: '50%'
                    }}
                    value={collegeSearch}
                    onChange={e => setCollegeSearch(e.target.value)}
                />
            </Paper>
            {!gotCollege ? (<Grow in timeout={500}>
                <Stack sx={{ width: '100%' }}>
                    <Alert
                        severity="error"
                    >
                        No Colleges Found
                    </Alert>
                </Stack>
            </Grow>) :
                (<>
                    {collegeRows.length === 0 ? (
                        <Typography align="center">
                            <CircularProgress />
                        </Typography>
                    ) : (
                        <TableContainer sx={{ maxHeight: 600, "&::-webkit-scrollbar": { display: "none" } }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                sx={{ background: `url(${texturedImage})`, color: "orange" }}
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontFamily: "Nunito Sans", fontWeight: "600" }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        collegeRows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell style={{ fontFamily: "Nunito Sans", fontWeight: "600" }} key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}                                                        </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                </>)

            }
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={collegeRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default Colleges;