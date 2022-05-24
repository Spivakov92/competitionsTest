import { Box, Stack } from "@mui/material";
import Competitions from "./components/Competitions";

function App() {
  return (
    <Stack
      component="main"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Competitions />
    </Stack>
  );
}

export default App;
