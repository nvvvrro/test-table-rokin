import { Typography } from "@mui/material";
import React from "react";
import DataTable from "./components/Table/DataTable";
const App = () => {
  return (
    <div>
      <Typography variant="h4">Datos Usuario</Typography>
      <DataTable />
    </div>
  );
};

export default App;
