import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  Heading,
  VStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const columnDefs = [
  { field: "firstName", name: "First Name" },
  { field: "lastName", name: "Last Name" },
];

const Directory = () => {
  const [directoryData, setDirectoryData] = useState([]);

  useEffect(() => {
    const fetchDirectory = async () => {
      const directoryResponse = await fetch("/api/directory");
      const directoryData = await directoryResponse.json();
      setDirectoryData(directoryData.directory);
    };
    fetchDirectory();
  }, []);

  console.log({ directoryData });

  return (
    <VStack>
      <Heading>Directory</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              {columnDefs.map((column) => (
                <Th key={column.field}>{column.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {directoryData.map((row) => (
              <Tr key={row.id}>
                {columnDefs.map((column) => (
                  <Td key={column.field}>{row[column.field]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default Directory;
