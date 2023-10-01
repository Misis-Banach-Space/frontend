import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
const columns: GridColDef[] = [
    { 
      field: 'category', 
      headerName: 'Категория', 
      flex: 1,
      renderHeader: (params) => (
        <strong style={{ fontSize: '1.2em', color: '#4094AC' }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
    { 
      field: 'theme', 
      headerName: 'Тематика', 
      flex: 1,
      renderHeader: (params) => (
        <strong style={{ fontSize: '1.2em', color: '#4094AC' }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
    { 
        field: 'link', 
        headerName: 'Ссылка', 
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
      }
  ];
  
  
  
  
  interface Props {
      data: string[][];
  }
  
  type YandexRequestItem = {
      category: string;
      theme: string;
      link: string;
  };
  
  export default function DataTable(props: Props) {
      const { data } = props;
      const [rows, setRows] = useState<YandexRequestItem[]>([]);
  
      useEffect(() => {
          let newData = data.map(([category, theme, link], index) => ({
              id: index,
              category,
              theme,
              link
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