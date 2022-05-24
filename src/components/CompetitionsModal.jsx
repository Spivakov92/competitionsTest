import { Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { modalStyle, typesOfMatch } from "./aditionalData";



export default function CompetitionsModal(props) {
  const [type, setType] = useState('football');
  const [firstTeam, setFirstTeam] = useState('');
  const [secondTeam, setSecondTeam] = useState('');
  useEffect(() => {
    setType(props.editValues.type)
    setFirstTeam(props.editValues.firstTeam)
    setSecondTeam(props.editValues.secondTeam)

  }, [props.editValues])

   const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleFirstTeamChange = (event) => {
    setFirstTeam(event.target.value);
  };
  const handleSecondTeamChange = (event) => {
    setSecondTeam(event.target.value);
  };
  return (
    <Modal
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Set competition
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <TextField
            required
            select
            id="standard-required"
            variant="standard"
            helperText="Please select type of match"
            value={type}
            onChange={handleTypeChange}

          >{typesOfMatch.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>))}
          </TextField>
          <TextField
            required
            id="standard-required"
            placeholder="First team"
            variant="standard"
            value={firstTeam}
            onChange={handleFirstTeamChange} />
          <TextField
            required
            id="standard-required"
            placeholder="Second team"
            variant="standard"
            value={secondTeam}
            onChange={handleSecondTeamChange} />
        </Box>
        <Button variant="contained" disabled={!firstTeam || !secondTeam}
          onClick={() => props.addCompetition({
            id: props.editValues.id,
            type,
            firstTeam,
            secondTeam
          })}>Set competition</Button>
        <Button variant="contained" sx={{ ml: '15px' }} onClick={props.close}>Cancel</Button>
      </Box>
    </Modal>
  );
}


