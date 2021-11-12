import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import DataTableHead from "./DataTableHead";
import users from "./../../helpers/getUsers";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const DataTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rut");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState(users);

  const handleRequestSort = (event, property) => {
    if (orderBy === property) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setOrder("asc");
      setOrderBy(property);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //----------------------------------------------------------------------------------
  const count = {};

  user.forEach((item) => {
    count[item.rol] = (count[item.rol] || 0) + 1;
  });

  const cantidadRole = Object.keys(count).map((key) => ({
    rol: key,
    cantidad: count[key],
  }));

  //----------------------------------------------------------------------------------

  const MonthYear = user.map((item) => {
    let fecha = item.creacion.split("/");
    let fechaFormateada = `${fecha[1]}/${fecha[2]}`;
    return { ...item, monthYear: fechaFormateada };
  });

  const countMonthYear = {};

  MonthYear.forEach((item) => {
    countMonthYear[item.monthYear] = (countMonthYear[item.monthYear] || 0) + 1;
  });

  const cantidadMonthYear = Object.keys(countMonthYear).map((key) => ({
    monthYear: key,
    cantidad: countMonthYear[key],
  }));

  //----------------------------------------------------------------------------------

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <DataTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={user.length}
            />
            <TableBody>
              {user
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((us, index) => {
                  const id = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={us.rut}>
                      <TableCell component="th" id={id}>
                        {us.rut}
                      </TableCell>
                      <TableCell align="right">{us.nombre}</TableCell>
                      <TableCell align="right">{us.correo}</TableCell>
                      <TableCell align="right">{us.telefono}</TableCell>
                      <TableCell align="right">{us.rol}</TableCell>
                      <TableCell align="right">{us.empresa}</TableCell>
                      <TableCell align="right">{us.creacion}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={50}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" color="Black">
                  Rol
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="Black">
                  Cantidad
                </Typography>
              </TableCell>
            </TableRow>
            {cantidadRole.map((item) => {
              return (
                <TableRow>
                  <TableCell align="center">{item.rol}</TableCell>
                  <TableCell align="center">{item.cantidad}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" color="Black">
                  Fecha de Creacion
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="Black">
                  Cantidad por Mes y Año
                </Typography>
              </TableCell>
            </TableRow>
            {cantidadMonthYear
              .slice()
              .sort((a, b) => {
                return a.monthYear > b.monthYear ? 1 : -1;
              })
              .map((item) => {
                return (
                  <TableRow>
                    <TableCell align="center">{item.monthYear}</TableCell>
                    <TableCell align="center">{item.cantidad}</TableCell>
                  </TableRow>
                );
              })}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
