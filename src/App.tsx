import React from 'react';
import './App.css';
import {
  CrudTableComponent,
  CrudTableComponentSettings,
} from './components/CrudTableComponent/CrudTableComponent';
import testData from './components/CrudTableComponent/testData.json';

interface PropertyModel {
  readonly code: string;
  readonly dataType: string;
  readonly editable: boolean;
  readonly frontendInput: string;
  readonly id: string;
  readonly label: string;
  readonly multiple: boolean;
  readonly required: boolean;
}

const settings: CrudTableComponentSettings<PropertyModel> = {
  actions: [
    {
      type: 'add',
      handler: () => console.log('ADD_ACTION'),
    },
  ],
  fields: [
    {
      header: 'Тип инфомрации',
      name: 'dataType',
      render: (object) => <>{object.dataType}</>,
    },
    {
      header: 'Тип компонента',
      name: 'frontendInput',
      render: (object) => <>{object.frontendInput}</>,
    },
    {
      header: 'Код',
      name: 'code',
      render: (object) => <>{object.code}</>,
    },
    {
      header: 'Наименование',
      name: 'label',
      render: (object) => <>{object.label}</>,
    },
    {
      header: 'Множественный выбор',
      name: 'multiple',
      render: (object) => <>{`${object.multiple}`}</>,
    },
    {
      header: 'Обязательный',
      name: 'required',
      render: (object) => <>{`${object.required}`}</>,
    },
    {
      header: 'Редактируемый',
      name: 'editable',
      render: (object) => <>{`${object.editable}`}</>,
    },
  ],
};

function App() {
  return (
    <div className="App">
      <CrudTableComponent data={testData} settings={settings} />
    </div>
  );
}

export default App;
