import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// enum ActionTypes {
//   ADD = 'add',
//   EDIT = 'edit',
//   DELETE = 'delete',
//   DETAILS = 'details',
// }

interface MinimalDataModel {
  id: string;
  [key: string]: any;
}

export interface Action {
  // type: ActionTypes;
  type: 'add' | 'edit' | 'delete' | 'details';
  handler: (id?: string) => void;
}

export interface Field<DataModel> {
  header: string;
  name: string;
  render: (object: DataModel) => JSX.Element;
}

export interface CrudTableComponentSettings<DataModel> {
  actions: Action[];
  fields: Field<DataModel>[];
}

export interface CrudTableComponentProps<DataModel> {
  data: DataModel[];
  settings: CrudTableComponentSettings<DataModel>;
  store?: any;
}

export function CrudTableComponent<DataModel extends MinimalDataModel>(
  props: CrudTableComponentProps<DataModel>
): JSX.Element {
  const getDataObjectFields = (removeId: boolean = true): string[] => {
    return removeId
      ? Object.keys(props.data[0]).filter((fieldName) => fieldName !== 'id')
      : Object.keys(props.data[0]);
  };

  const getHeader = (): JSX.Element[] => {
    return props.settings.fields.map((field) => (
      <TableCell key={field.header}>{field.header}</TableCell>
    ));
  };

  const getRowsData = (): JSX.Element[] => {
    const fields = getDataObjectFields();

    return props.data.map((row, index) => (
      <TableRow key={index}>
        {fields.map((field, idx) => (
          <>
            <TableCell key={field}>
              {props.settings.fields[idx].render(props.data[index])}
            </TableCell>
          </>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>{getHeader()}</TableHead>
          <TableBody>{getRowsData()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
