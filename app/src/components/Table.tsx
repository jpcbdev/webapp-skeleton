import { useTable, usePagination } from 'react-table';

export const Table = ({ columns, data, rowByPage }: { columns: any[], data: any[], rowByPage?: number }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        prepareRow,
        setPageSize,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex, pageSize, autoResetPage },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: rowByPage || 15,
                pageIndex: 0
            },
            autoResetPage: false,
        },
        usePagination
    )
    return <div className='table__container mt-2'>
        {
            data.length ?
                <div className='table-responsive'>
                    <table className='table' {...getTableProps()}>
                        <thead className=''>
                            {headerGroups.map((headerGroup: any) => (
                                <tr className='' {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column: any) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row: any) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: any) => {
                                            return <td {...cell.getCellProps()}>
                                                <small className=''>
                                                    {cell.render('Cell')}
                                                </small>
                                            </td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                        <span className='ms-2'>
                            Página{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                </div>
                : <div>
                    <h1 className='text-center'>
                        <i className="far fa-file"></i>
                    </h1>
                    <h6>No hay resultados</h6>
                </div>
        }
    </div>
}