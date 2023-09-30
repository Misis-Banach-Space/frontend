import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
const columns: GridColDef[] = [
  {
    field: 'keyword',
    headerName: 'URL сайта',
    flex: 1,
    renderCell: (params) => (
      <a href={params.value as string} target="_blank" rel="noopener noreferrer">
        {params.value}
      </a>
    ),
    renderHeader: (params) => (
      <strong style={{ fontSize: '1.2em', color: '#4094AC' }}>
        {params.colDef.headerName}
      </strong>
    ),
  },
  {
    field: 'link',
    headerName: 'Категория',
    flex: 1,
    renderHeader: (params) => (
      <strong style={{ fontSize: '1.2em', color: '#4094AC' }}>
        {params.colDef.headerName}
      </strong>
    ),
  },
  {
    field: 'monthrequests',
    headerName: 'Тематика',
    flex: 1,
    renderCell: (params) => (
      <div style={{ textAlign: 'center' }}>
        {params.value}
      </div>
    ),
    renderHeader: (params) => (
      <strong style={{ fontSize: '1.2em', color: '#4094AC', textAlign: 'center' }}>
        {params.colDef.headerName}
      </strong>
    ),
  }
];




interface Props {
  data: string[][];
}

type YandexRequestItem = {
  keyword: string;
  link: string;
  monthrequests: string;
};

export default function PageTable(props: Props) {
  const { data } = props;
  const [rows, setRows] = useState<YandexRequestItem[]>([]);

  useEffect(() => {
    let newData = data.map(([keyword, link, monthrequests], index) => ({
      id: index,
      keyword,
      link,
      monthrequests
    }));
    setRows(newData);
  }, []);


  return (
    <div style={{ height: '100%', width: '100%', maxWidth: '800px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
      />
    </div>
  );
}
