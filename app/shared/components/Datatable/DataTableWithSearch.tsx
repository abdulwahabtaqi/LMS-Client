import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { TableColumns } from './types';
import { SplitButton } from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface DatatableWithSearchProps<T> {
    tableColumns: TableColumns[];
    data: T[];
    loading?: boolean;
}

const DataTableWithSearch = <T,>({ data, tableColumns, loading }: DatatableWithSearchProps<T>) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [selectedSubTopic, setSelectedSubTopic] = useState<string | null>(null);
    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const dataTableReference = useRef<DataTable<any[]>>(null);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };
    const exportCSV = (selectionOnly: any) => {
        dataTableReference?.current?.exportCSV({ selectionOnly });
    };
    const onPage = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'products');
        });
    };
    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const subTopicOptions = Array.from(new Set(data?.map((d: any) => d?.subTopic?.subTopic)));

    const difficultyLevelOptions = Array.from(new Set(data.map((d: any) => d.difficultyLevel)));
    const typeOptions = Array.from(new Set(data.map((d: any) => d.type)));

    const filteredData = data.filter((item: any) => {
        return (!selectedSubTopic || item.subTopic?.subTopic === selectedSubTopic) && (!selectedDifficultyLevel || item.difficultyLevel === selectedDifficultyLevel) && (!selectedType || item.type === selectedType);
    });

    const resetFilters = () => {
        setGlobalFilter('');
        setSelectedSubTopic(null);
        setSelectedDifficultyLevel(null);
        setSelectedType(null);
    };

    const actions = [
        { label: 'Export CSV', icon: 'pi pi-file-pdf', command: exportCSV },
        { label: 'Export Xlsx', icon: 'pi pi-file-excel', command: exportExcel }
    ];
    const renderHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between p-ai-center p-w-full">
                    <InputText value={globalFilter} onChange={onInputChange} placeholder="Keyword Search" className="mx-2 my-2" />
                    {subTopicOptions.length > 1 && <Dropdown value={selectedSubTopic} options={subTopicOptions} onChange={(e) => setSelectedSubTopic(e.value)} placeholder="Filter by SubTopic" className="mx-2 my-2" />}
                    <Dropdown value={selectedDifficultyLevel} options={difficultyLevelOptions} onChange={(e) => setSelectedDifficultyLevel(e.value)} placeholder="Filter by Difficulty" className="mx-2 my-2" />
                    {/* {selectedDifficultyLevel && <Dropdown value={selectedDifficultyLevel} options={difficultyLevelOptions} onChange={(e) => setSelectedDifficultyLevel(e.value)} placeholder="Filter by Difficulty" className="mx-2 my-2" />} */}
                    <Dropdown value={selectedType} options={typeOptions} onChange={(e) => setSelectedType(e.value)} placeholder="Filter by Type" className="mx-2 my-2" />
                    {selectedType && <Button label="Reset All Filters" icon="pi pi-refresh" onClick={resetFilters} className="mx-2 my-2 p-button-danger" />}
                    <SplitButton label="Export" icon="pi pi-download" model={actions} className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    // const exportColumns = tableColumns.map((x) => ({ title: x?.header, dataKey: x?.field }));
    //   const exportPdf = () => {
    //     import('jspdf').then((jsPDF) => {
    //         import('jspdf-autotable').then(() => {
    //             const doc = new jsPDF.default('l', 'pt', 'a4', true);

    //             doc?.autoTable(exportColumns, data);
    //             doc.save('products.pdf');
    //         });
    //     });
    // };

    const header = renderHeader();
    return (
        <div>
            <div className="card">
                <DataTable
                    ref={dataTableReference}
                    value={filteredData}
                    header={header}
                    globalFilter={globalFilter}
                    loading={loading}
                    emptyMessage="No records found"
                    paginator
                    first={first}
                    rows={rows}
                    totalRecords={data.length}
                    onPage={onPage}
                    rowsPerPageOptions={[10, 20, 50]}
                >
                    {tableColumns.map((x: TableColumns) => (
                        <Column
                            key={x.field}
                            field={x.field}
                            header={x.header}
                            sortable={x.sortable}
                            // TODO: add filter
                            // filter={x.filter}
                            // filterPlaceholder={x.filterPlaceholder}
                            // filterMatchMode={x.filterMatchMode}
                            body={x.body}
                        />
                    ))}
                </DataTable>
            </div>
        </div>
    );
};

export default DataTableWithSearch;
