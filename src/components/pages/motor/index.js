import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Input } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";
import Popup from 'reactjs-popup';

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

export default function MotorComponent() {
  const [allData, setAllData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [licence, setLicence] = React.useState("");
  const [seats, setSeats] = React.useState("");
  const [location, setLocation] = React.useState("");;
  const [motors, setMotors] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/motors/allMotors`);
        const motors = await response.json();
        setFilteredData(motors.data);
        setAllData(motors.data);
      } catch (error) {
        console.log("Motor data is wrong:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(`${BASEURL}/motors/addNewMotor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          brand: brand,
          company: company,
          cost: cost,
          licence: licence,
          seats: seats,
          location: location
        }),
      });
      await response.json();
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log("Add motor data is wrong:", error);
    }
  };
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`${BASEURL}/motors/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // console.log("ok:", response.ok);
        setMotors(motors.filter((motor) => motor.id !== id));
      }
    } catch (error) {
      console.log("Error deleting motor:", error);
    }
  }

  const handleUpdateClick = async (_id) => {
    try {
      const response = await fetch(`${BASEURL}/motors/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Fix the typo here
        },
        body: JSON.stringify({
          name: name,
          brand: brand,
          company: company,
          cost: cost,
          licence: licence,
          seats: seats,
          location: location,
        }),
      });
      if (response.ok) {
        // console.log(response.ok);
        setOpenEdit(false);
      }
    } catch (error) {
      console.log("update is wrong", error);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = allData.filter(
      (data) =>
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.company.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };


  const formatDate = (createdAt) => {
    const data = new Date(createdAt);
    return data.toISOString().split("T")[0];
  };
  const formatUpdatedDate = (updatedAt) => {
    const data = new Date(updatedAt);
    return data.toISOString().split("T")[0];
  };

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
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
        <Snackbar
          autoHideDuration={5000}
          color="primary"
          size="lg"
          invertedColors
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={(theme) => ({
            background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
            maxWidth: 360,
          })}
        >
          <div style={{ marginLeft: "15%" }} >
            <Typography level="title-lg" sx={{ textAlign: "center" }}>
              Add information
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Input
                color="primary"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Brand"
                onChange={(e) => setBrand(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Brand"
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Cost"
                onChange={(e) => setCost(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Licence"
                onChange={(e) => setLicence(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Seats"
                onChange={(e) => setSeats(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="solid" color="success" onClick={handleClick}>
                Add
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </Snackbar>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Licence</StyledTableCell>
              <StyledTableCell>Cost</StyledTableCell>
              <StyledTableCell>Seats</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Created time</StyledTableCell>
              <StyledTableCell>Updated time</StyledTableCell>
              <StyledTableCell sx={{paddingLeft: '7%'}}>Tools</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((data) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell>{data.name || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.brand || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.company || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.licence || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.cost || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.seats || "No Data"}</StyledTableCell>
                  <StyledTableCell>{data.location || "No Data"}</StyledTableCell>
                  <StyledTableCell>{formatDate(data.createdAt || "No Data")}</StyledTableCell>
                  <StyledTableCell>{formatUpdatedDate(data.updatedAt || "No Data")}</StyledTableCell>
                  <StyledTableCell sx={{paddingLeft: '2%'}}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        handleDeleteClick(data._id);
                      }}
                    >
                      Delete
                    </Button>

                    <Popup
                      trigger={<Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        style={{ marginLeft: 10 }}
                        onClick={() => setOpenEdit(true)}
                      >
                        Edit
                      </Button>}
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <div style={{ background: '#e6eef5', width: '50vh', padding: '10px', borderRadius: '10px', border: 'solid 2px #c7dbed' }}>
                            <Typography
                              level="title-lg"
                              sx={{ textAlign: "center" }}
                            >
                              Edit
                            </Typography>
                            <Typography sx={{ mt: 1, mb: 2, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              <Input style={{ background: '#c7dbed', }}
                                color="primary"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Brand"
                                onChange={(e) => setBrand(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Brand"
                                onChange={(e) => setCompany(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Cost"
                                onChange={(e) => setCost(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Licence"
                                onChange={(e) => setLicence(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Seats"
                                onChange={(e) => setSeats(e.target.value)}
                              />
                              <Input style={{ background: '#c7dbed' }}
                                color="primary"
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Button
                                variant="outlined"
                                color="success"
                                onClick={() => {
                                  handleUpdateClick(data._id);
                                  close();
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                  close();
                                }}
                              >
                                Cancel
                              </Button>
                            </Stack>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
