import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CircularProgress, Box } from "@mui/material";

const columns = [
  { field: 'arrival', Arrival: 'Arrival', width: 90 },
  { field: 'departure', Departure: 'Departure', width: 200 },
];
export default function DataTable(props) {
  const { search, setSelect, searchedData, refresh } = props;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.get(
        "http://20.244.56.144:80/train/trains"
      );
      setData(res.data);
      setLoading(false);
    };

    getData();
  }, [refresh]);

  return (
    <>
      {/* Table UI */}
      <Card
        style={{
          height: 461,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#a9a9a9",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            style={{ width: "100%", border: "none" }}
            sx={{
              "& .MuiTablePagination-root": {
                color: "white",
                width: "100%",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
                borderBottom: "1.5px solid #B3B7BA",
                justifyContent: "flex-end",
              },
              "& .MuiButtonBase-root.MuiIconButton-root": {
                color: "white",
              },
              "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                color: "#a9a9a9",
              },
              ".MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              ".MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              "& .MuiCheckbox-root": {
                color: "white",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "white",
              },
              "& .MuiDataGrid-row:hover": {
                color: "white",
                backgroundColor: "#1D2B34",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#a9a9a9",
                color: "white",
                borderBottom: "2px solid #B3B7BA",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "transparent",
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: "white",
                width:"20%",
                position: "absolute",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                marginLeft: {lg:"4px"},
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#a9a9a9",
              },
              "& .MuiSvgIcon-root.MuiSelect-icon": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: 1.8,
              },
              "& .MuiTablePagination-actions": {
                position: {lg: "absolute"},
                left: "50%",
                transform: {lg: "translateX(-50%)"},
                width: {lg:"12%"},
                marginLeft: {xs:2, lg:0},
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
              "& .MuiTablePagination-displayedRows": {
                marginRight:{lg:2}
              },  
            }}
            rows={
              searchedData.length > 0
                ? searchedData
                : search === ""
                ? data
                : data.filter(
                    (row) =>
                      row.customerNumber.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.companyCode.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.id.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.customerOrderId.toLowerCase().includes(search.toLowerCase())
                  )
            }
            columns={columns}
            getRowId={(data) => data.SlNo}
            rowHeight={31}
            rowsPerPageOptions={[10, 25, 35]}
            loading={loading}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
          />
        )}
      </Card>
      {loading === true || searchedData.length > 0 ? null : (
        <Box
          sx={{
            color: "white",
            position: "absolute",
            left: "49%",
            bottom:"9%",
            zIndex: 10,
            visibility: { xs: "hidden", lg: "visible" },
          }}
        >
          {page} of {(data.length / pageSize).toFixed(0)}
        </Box>
      )}
    </>
  );
}