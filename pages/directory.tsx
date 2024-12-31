import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

const columnDefs = [{ field: "firstName" }, { field: "lastName" }];

const Directory = () => {
  const [directoryData, setDirectoryData] = useState([]);

  useEffect(() => {
    const fetchDirectory = async () => {
      const directoryResponse = await fetch("/api/directory");
      const directoryData = await directoryResponse.json();
      setDirectoryData(directoryData);
    };
    fetchDirectory();
  }, []);

  return <AgGridReact rowData={directoryData} columnDefs={columnDefs} />;
};

export default Directory;
