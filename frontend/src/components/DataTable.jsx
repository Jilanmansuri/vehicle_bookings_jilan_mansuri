import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const DataTable = ({ columns, rows, loading, page, pageSize, totalRows, onPageChange, onPageSizeChange, onSearch, title = "Data" }) => {
  const themeMode = useSelector((state) => state.ui.themeMode);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleExportCSV = () => {
    if (!rows || rows.length === 0) return;
    
    // Get visible column headers
    const visibleColumns = columns.filter(c => c.field !== 'actions');
    const headers = visibleColumns.map(c => c.headerName).join(',');
    
    // Extract data
    const csvRows = rows.map(row => {
      return visibleColumns.map(col => {
        let val = '';
        if (col.valueGetter) {
          try {
            val = col.valueGetter({ row, value: row[col.field] });
          } catch(e) { val = ''; }
        } else {
          val = row[col.field] || '';
        }
        // Escape quotes and wrap in quotes for CSV safety
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });

    const csvContent = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper className="w-full h-full shadow-sm dark:bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center gap-4 flex-wrap">
        {onSearch && (
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
              className: "dark:text-white dark:bg-gray-700 rounded-lg"
            }}
            className="w-full sm:w-64"
          />
        )}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleExportCSV}
          className="dark:border-gray-600 dark:text-gray-300 ml-auto"
        >
          Export Page
        </Button>
      </div>
      
      <div className="h-[600px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          paginationMode="server"
          rowCount={totalRows}
          page={page}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          pageSize={pageSize}
          onPaginationModelChange={(model) => {
            onPageChange(model.page);
            if (model.pageSize !== pageSize) {
              onPageSizeChange(model.pageSize);
            }
          }}
          disableRowSelectionOnClick
          getRowId={(row) => row._id || row.id}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: themeMode === 'dark' ? '#374151' : '#e5e7eb',
              color: themeMode === 'dark' ? '#d1d5db' : '#374151',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: themeMode === 'dark' ? '#1f2937' : '#f9fafb',
              color: themeMode === 'dark' ? '#9ca3af' : '#6b7280',
              borderColor: themeMode === 'dark' ? '#374151' : '#e5e7eb',
            },
            '& .MuiDataGrid-footerContainer': {
              borderColor: themeMode === 'dark' ? '#374151' : '#e5e7eb',
              color: themeMode === 'dark' ? '#9ca3af' : '#6b7280',
            },
            '& .MuiTablePagination-root': {
              color: themeMode === 'dark' ? '#9ca3af' : '#6b7280',
            },
          }}
        />
      </div>
    </Paper>
  );
};

export default DataTable;
