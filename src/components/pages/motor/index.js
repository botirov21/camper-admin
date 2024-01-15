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
        setAllData(motors.data);
        setFilteredData(motors.data);
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

  const handleUpdateClick = async (_id) => {
    // setOpenEdit(true);
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
  const handleSearch = (query) => {
    setSearch(query);
    const filtered = allData.filter(
      (data) =>
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.company.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // const filteredSearch = searchFilter;
  console.log("filter", filteredData);

  const formatDate = (createdAt) => {
    const data = new Date(createdAt);
    return data.toISOString().split("T")[0];
  };

  console.log(formatDate);
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
        <TextField id="outlined-basic" label="Outlined" variant="outlined"           onChange={(e) => handleSearch(e.target.value)} />
        {/* to Open */}
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
        <Snackbar
          autoHideDuration={5000}
          variant="solid"
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
          <div>
            <Typography level="title-lg" sx={{ textAlign: "center" }}>
              Malumot Qo'shish
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
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
              sx={{ display: "flex", justifyContent: "right" }}
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

        {/* pop for update */}
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
              <StyledTableCell align="right">Tools</StyledTableCell>
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
                <StyledTableCell align="right">
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
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    style={{ marginLeft: 10 }}
                    onClick={() => setOpenEdit(true)}
                    >
                    Edit
                  </Button>
                  <Popup
                      trigger={<button className="button"> Open Modal </button>}
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <div className="header"> Modal Title </div>
                          <div>
                            <Typography
                              level="title-lg"
                              sx={{ textAlign: "center" }}
                            >
                              Malumot Qo'shish
                            </Typography>
                            <Typography sx={{ mt: 1, mb: 2 }}>
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
                              sx={{ display: "flex", justifyContent: "right" }}
                            >
                              {/* error */}
                              {/* <Button variant="solid" color="success" onClick={() => {handleUpdateClick(data._id);}}> */}
                              <Button
                                variant="solid"
                                color="success"
                                onClick={() => {
                                  handleUpdateClick(data._id);
                                }}
                              >
                                Updaterrr
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setOpenEdit(false)}
                              >
                                Cancel
                              </Button>
                            </Stack>
                          </div>
                          <div className="actions">
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              close modal
                            </button>
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
