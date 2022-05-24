import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CompetitionsModal from "./CompetitionsModal";
import { typesOfMatch, defaultEditValues } from "./aditionalData";

const BASE_URL = "http://localhost:3001";

export const getCompetitionStatus = (item) => {
  if (item.isRunning) {
    return "running";
  } else if (!item.isRunning && item.result) {
    return "finished";
  } else return "not started";
};

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const getCompetitions = async () => {
    const res = await axios.get(`${BASE_URL}/competitions`);
    setCompetitions(res.data);
    setFilteredCompetitions(res.data);
  };
  useEffect(() => {
    getCompetitions();
  }, []);

  const removeCompetition = async (item) => {
    await axios.delete(`${BASE_URL}/competitions/${item.id}`);
    getCompetitions();
  };

  const [open, setOpen] = useState(false);
  const [editValues, setEditValues] = useState(defaultEditValues);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditValues(defaultEditValues);
    setOpen(false);
  };
  const addCompetition = async (item) => {
    const send = item.id ? axios.patch : axios.post;
    await send(`${BASE_URL}/competitions/${item.id || ""}`, {
      id: item.id,
      type: item.type,
      teams: [item.firstTeam, item.secondTeam],
    });
    getCompetitions();
    handleClose();
  };

  const [filter, setFilter] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(value);
  };

  const filterCompetition = () => {
    setFilteredCompetitions(
      competitions.filter((item) => filter.includes(item.type))
    );
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={filter}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {typesOfMatch.map((name) => (
              <MenuItem key={name.value} value={name.value}>
                <Checkbox checked={filter.indexOf(name.value) > -1} />
                <ListItemText primary={name.value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={filterCompetition}>
        filter competition{" "}
      </Button>

      <TableContainer component={Paper} sx={{ width: 650 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Teams</TableCell>
              <TableCell align="right">Active now</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompetitions.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.type}
                </TableCell>
                <TableCell align="right">
                  {item.teams[0]} vs {item.teams[1]}
                </TableCell>
                <TableCell align="right">
                  {getCompetitionStatus(item)}
                </TableCell>
                <TableCell
                  sx={{ color: item.isRunning ? "red" : "black" }}
                  align="right"
                >
                  {item.result ? `${item.result[0]} : ${item.result[1]}` : ""}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setEditValues({
                        id: item.id,
                        type: item.type,
                        firstTeam: item.teams[0],
                        secondTeam: item.teams[1],
                      });
                      handleOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeCompetition(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleOpen}>
        Add competition
      </Button>
      <CompetitionsModal
        addCompetition={addCompetition}
        isOpen={open}
        close={handleClose}
        editValues={editValues}
      />
    </>
  );
}
