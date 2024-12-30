import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
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

  debugger;
  return <AgGridReact rowData={directoryData} columnDefs={columnDefs} />;
};

export default Directory;
