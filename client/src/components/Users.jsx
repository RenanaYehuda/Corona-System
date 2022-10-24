import React from 'react'
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Typography, ButtonGroup, Button, TableRow, TableCell, Box, TableHead, Table, TableBody, TableContainer, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

import { getUsers, deleteUser } from '../api/usersApi';

const Users = () => {

    const { data, status, refetch } = useQuery("allUsers", () => getUsers());

    const deleteUserMutation = useMutation(obj => {
        return deleteUser(obj)
    }, {
        onSuccess: () => {
            refetch()
        },
    })

    let navigate = useNavigate();

    if (status === 'error') {
        return <div>שגיאה</div>
    }

    if (status === 'loading') {
        return <div>נטען</div>
    }


    return (
        <Box>
            <Typography variant="h1" component="h2">
                מערכת קורונה
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => navigate(`/create-user`)}>הוספת חבר</Button>
            </ButtonGroup>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">שם חבר</TableCell>
                            <TableCell align="left">מחיקת חבר</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((user, i) =>
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <Button onClick={() => navigate(`/user/${user._id}`)}>
                                        {user.fullName}
                                    </Button>
                                </TableCell >
                                <TableCell align="left"><IconButton onClick={() => {
                                    deleteUserMutation.mutate(user._id)
                                }} ><DeleteIcon size='small' /></IconButton></TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>


        </Box>

    )
}

export default Users
