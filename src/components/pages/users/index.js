import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {TextField,Typography } from "@mui/material";
;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BASEURL = "http://localhost:5050/api/v1";

export default function UsersComponent() {
  const [allData, setAllData] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0); // State to store the total

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/auth/getAllusers`);
        const users = await response.json();
        setAllData(users.data);
      } catch (error) {
        console.log("UsedCars data is wrong:", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalUsers(allData.length);
  }, [allData]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Registred date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((data) => (
              <StyledTableRow key={data.name}>
                <StyledTableCell>{data.name || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.email || "No Data"}</StyledTableCell>
                <StyledTableCell>
                  {/* Display the formatted created time */}
                  {new Date(data.createdAT).toLocaleDateString()}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Total Users: {totalUsers}</h3>
    </div>
  );
}
