import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface MinimalDataModel {
  id: string;
  [key: string]: any;
}

export interface Action {
  /**
   * Типы действий (добавляют нужные кнопки/компоненты)
   */
  type: 'add' | 'edit' | 'delete' | 'details';

  /**
   * Действие при нажатии на кнопку
   * @param id
   */
  handler: (id?: string) => void;

  /**
   * Кастомный компонент вместо кнопки
   */
  component?: () => JSX.Element;
}

export interface Field<DataModel> {
  /**
   * Заголовок колонки в таблице
   */
  header: string;

  /**
   * Название поля в котором данные возвращаются с API
   */
  name: string;

  /**
   * Функиця которая отрисовывает элемент в ячейке
   * @param object - Объект с данными который возвращает API
   */
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
  const getDataObjectFields = (): string[] => {
    return props.settings.fields.map((field) => field.name);
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
