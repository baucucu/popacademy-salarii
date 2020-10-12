import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  MasterDetail,
  Selection,
  // Form,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Tasks</h2>

    <DataGrid
      className={'dx-card wide-card'}
      dataSource={remoteDataSource}
      keyExpr="_id"
      showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      onSelectionChanged={selectionChanged}
      onContentReady={contentReady}
    >
      <Paging defaultPageSize={50} />
      <Pager showPageSizeSelector={true} showInfo={true} />
      <FilterRow visible={true} />
      <Selection mode="single" />
      {/* <Column dataField={'_id'} width={90} hidingPriority={2} /> */}
      <Column
        dataField={'clientNume'}
        width={190}
        caption={'Client'}
        hidingPriority={8}
      />
      <Column
        dataField={'service'}
        width={190}
        caption={'Service'}
        hidingPriority={8}
      />
      <Column
        dataField={'staffBooking[0].nume'}
        width={190}
        caption={'Staff'}
        hidingPriority={8}
      />
      <Column
        dataField={'dataProgramarii'}
        width={120}
        dataType={'date'}
        format={'dd MMM yyyy'}
        caption={'Data'}
        hidingPriority={5}
      ></Column>
      <Column
        dataField={'oraProgramariiStart'}
        width={120}
        dataType={'date'}
        format={'HH:mm'}
        caption={'Ora'}
        hidingPriority={5}
      ></Column>
      <Column
        dataField={'status'}
        caption={'Status'}
        hidingPriority={5}
      >
        <Lookup
          dataSource={statusValues}
          valueExpr={'value'}
          displayExpr={'name'}
        />
      </Column>
      <MasterDetail
          enabled={false}
          render={renderDetail}
        />
      
    </DataGrid>
  </React.Fragment>
);

const contentReady = (e) => {
  if (!e.component.getSelectedRowKeys().length)
  { e.component.selectRowsByIndexes(0); }
}
const selectionChanged = (e) => {
  e.component.collapseAll(-1);
  e.component.expandRow(e.currentSelectedRowKeys[0]);
}

const serviceUrl = 'https://popacademy-97cc.restdb.io/rest/bookings-raw?apikey=5f7ee46d5799e648a5a8edfa';
 
const remoteDataSource = createStore({
    key: '_id',
    loadUrl: serviceUrl,
    insertUrl: serviceUrl,
    updateUrl: serviceUrl,
    deleteUrl: serviceUrl,
});

const statusValues = [
  { name: 'CONFIRMED', value: 'CONFIRMED' },
  { name: 'PENDING', value: 'PENDING_APPROVAL' },
  { name: 'CANCELED', value: 'CANCELED' },

]

function renderDetail(props) {
  let { clientNume, status } = props.data;
  return (
    <div className="employee-info">
      <p>Nume: {clientNume}</p>
      <p className="employee-notes">Status: {status}</p>
    </div>
  );
}