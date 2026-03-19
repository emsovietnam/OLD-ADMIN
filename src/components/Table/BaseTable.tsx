import {
  CardMedia,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  createStyles
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles, withStyles } from '@mui/styles';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moneyFormat, { formatDateTimeToDate } from 'src/common/string';
import InputEdit from '../Input/InputEdit';
const theme = createTheme();

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        height: 'calc(100% - 120px)',
        position: 'relative',
        border: `1px solid #f1f2f5`
      },
      rootTable: {
        backgroundColor: '#fff',
        borderCollapse: 'inherit !important' as any
      },
      rootCellData: {
        wordBreak: 'break-word',
        padding: '6px !important',
        margin: '0px -16px'
      },

      cellHeaderSticky: {
        position: 'sticky',
        top: 0,
        background: '#f1f2f5',
        // boxShadow: '1px 0px 1px grey',
        padding: '6px !important',
        zIndex: '2 !important' as any
      },
      cellStickyHeaderRight: {
        position: 'sticky',
        right: 0,
        top: 0,
        width: 100,
        background: '#f1f2f5',

        zIndex: '0 !important' as any,
        padding: '6px !important'
      },
      cellStickyLeft: {
        position: 'sticky',
        left: 0,
        background: '#fff',

        padding: '6px !important',
        zIndex: 2
      },
      cellStickyRight: {
        position: 'sticky',
        right: 0,
        background: '#fff',
        padding: '6px !important',
        zIndex: 0
      },
      textHeader: {
        fontWeight: '700 !important' as any
      },
      cell: {
        padding: '6px !important'
      },
      coverBtnAction: { display: 'flex' },
      buttonCancel: {
        padding: '10px !important',
        margin: '0 3px !important',
        minWidth: '0px !important',
        color: `${theme.palette.error.main} !important`,
        borderColor: `${theme.palette.error.main} !important`
      },
      buttonPreview: {
        padding: '10px !important',
        margin: '0 3px !important',
        minWidth: '0px !important',
        color: `${theme.palette.success.main} !important`,
        borderColor: `${theme.palette.success.main} !important`
      },
      buttonEdit: {
        padding: '10px !important',
        margin: '0 3px !important',
        minWidth: '0px !important',
        color: `${theme.palette.info.main} !important`,
        borderColor: `${theme.palette.info.main} !important`
      },
      buttonAction: {
        padding: '10px !important',
        margin: '0 3px !important',
        minWidth: '0px !important',
        color: `${theme.palette.grey[600]} !important`
      }
    }),
  { index: 1 }
);

const BaseTable = props => {
  const {
    header,
    data,
    renderManage,
    handleSelectRow,
    leftSticky,
    sx,
    manageName,
    rowsSelected,
    page,
    perPage
  } = props;
  const StickyTableCell = withStyles(() => ({
    head: {
      // width: '1000px',
      background: '#f1f2f5',
      color: theme.palette.common.white,
      left: 0,
      top: 0,
      position: 'sticky',
      padding: '6px !important',
      zIndex: 3
    },
    body: {
      padding: '6px !important',
      backgroundColor: '#fff',
      zIndex: '2 !important' as any,
      left: 0,
      position: 'sticky',
      width: 'fit-content(20em)'
    }
  }))(TableCell);
  const classes: any = useStyles(props);

  const { t } = useTranslation();
  const [currentCell, setCurrentCell] = useState({} as any);
  const [rowSelected, setRowSelected] = useState([] as any);

  const renderValueCell = (text, color, cell) => {
    return (
      <Typography
        style={cell.sx}
        variant="body2"
        classes={{ root: classes.rootCellData }}
        sx={{ color: color && color }}
      >
        {text && text}
      </Typography>
    );
  };

  const renderCellData = (row, cell) => {
    let valueCell = row[cell.key];

    if (cell.isEdit) {
      return (
        <InputEdit
          onChange={cell.onChange}
          handleSave={value => cell.handleSave && cell.handleSave(row, value)}
          defaultValue={valueCell}
        />
      );
    }
    switch (cell.type) {
      case 'Currency':
        valueCell = moneyFormat(parseInt(valueCell));
        break;
      case 'Date':
        valueCell = formatDateTimeToDate(valueCell);
        break;
      case 'type':
        valueCell = cell.key;
        break;
      case 'display_name':
        valueCell = row?.target_account?.display_name;
        break;
      case 'page_title':
        valueCell = row?.page?.title;
        break;
      case 'group_title':
        valueCell = row?.group?.title;
        break;
      case 'project_title':
        valueCell = row?.project?.title;
        break;
      case 'status':
        switch (valueCell) {
          case 'approved':
            return renderValueCell('Đã phê duyệt', 'green', cell);
          case null:
          case 'pending':
            return renderValueCell('Đang chờ', 'orange', cell);
          case 'rejected':
            return renderValueCell('Từ chối', 'red', cell);
        }
        break;
    }
    switch (valueCell) {
      case 'approved':
        return renderValueCell('Đã phê duyệt', 'green', cell);
      case 'pending':
        return renderValueCell('Đang chờ', 'orange', cell);
      case 'rejected':
        return renderValueCell('Từ chối', 'red', cell);
      case 'adult':
        return renderValueCell('Người lớn', 'inherit', cell);
      case 'kid':
        return renderValueCell('Trẻ con', 'inherit', cell);
      case 'all':
        return renderValueCell('Tất cả', 'inherit', cell);
    }
    switch (typeof valueCell) {
      case 'string': {
        return (
          <Typography
            style={cell.sx}
            variant="body2"
            classes={{ root: classes.rootCellData }}
          >
            {valueCell && parse(valueCell)}
          </Typography>
        );
      }
      case 'object': {
        if (valueCell?.type === 'image') {
          return (
            <CardMedia
              component="img"
              src={valueCell.show_url ?? valueCell.url}
              sx={{ width: '265px' }}
              height="80px"
              alt=""
            />
          );
        } else {
          return (
            <Typography
              style={cell.sx}
              variant="body2"
              classes={{ root: classes.rootCellData }}
            >
              {valueCell?.text ||
                (valueCell?.id && parse(valueCell.text ?? valueCell.id))}
            </Typography>
          );
        }
      }
      case 'boolean': {
        if (valueCell) {
          return (
            <FormControlLabel
              disabled
              checked
              control={<Checkbox />}
              label=""
            />
          );
        } else {
          return <FormControlLabel disabled control={<Checkbox />} label="" />;
        }
      }
      default:
        return valueCell;
    }
  };
  useEffect(() => {
    rowsSelected && setRowSelected(rowsSelected);
  }, [rowsSelected]);
  useEffect(() => {
    handleSelectRow && handleSelectRow(rowSelected);
  }, [JSON.stringify(rowSelected)]);

  const onSelectAllClick = event => {
    if (event.target.checked) {
      setRowSelected(preValue => {
        let temp = cloneDeep(preValue);
        data.forEach(el => {
          temp.push(el);
        });
        return temp;
      });
    } else {
      setRowSelected(preValue => {
        let temp = cloneDeep(preValue);
        temp = temp.filter(selected => {
          return !data.some(function (el) {
            return selected.id === el.id;
          });
        });

        return temp;
      });
    }
  };

  const onSelectClick = (event, row) => {
    if (event.target.checked) {
      setRowSelected(preValue => {
        let temp = cloneDeep(preValue);
        temp.push(row);
        return temp;
      });
    } else {
      setRowSelected(preValue => {
        let temp = cloneDeep(preValue);
        temp = temp.filter(selected => selected.id !== row.id);
        return temp;
      });
    }
  };

  const checkedAll = () => {
    let found = data.find(selected => {
      return !rowSelected.some(function (el) {
        return selected.id === el.id;
      });
    });
    if (found) {
      return false;
    } else {
      return true;
    }
  };
  const isSelected = row => rowSelected.map(el => el.id).indexOf(row.id) !== -1;
  return (
    <TableContainer style={sx} classes={{ root: classes.root }}>
      <Table classes={{ root: classes.rootTable }}>
        <TableHead>
          <TableRow style={{ padding: '0px !important' }}>
            <StickyTableCell>
              {handleSelectRow && (
                <TableCell
                  style={{ border: 'none', padding: '6px !important' }}
                >
                  <Checkbox
                    color="primary"
                    checked={checkedAll()}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
              )}
              {leftSticky &&
                header?.map((col: any, index: number) => {
                  if (index < leftSticky) {
                    return (
                      <TableCell
                        sx={col.sx && col.sx}
                        key={col.key}
                        classes={{ root: classes.cellHeaderSticky }}
                        style={{ border: 'none', padding: '6px !important' }}
                      >
                        {col.sort ? (
                          <TableSortLabel>
                            <Typography
                              variant="body2"
                              style={{ minWidth: col.width }}
                              classes={{ root: classes.textHeader }}
                            >
                              {col.label}
                            </Typography>
                          </TableSortLabel>
                        ) : (
                          <Typography
                            variant="body2"
                            style={col && col.sx}
                            classes={{ root: classes.textHeader }}
                          >
                            {col.label}
                          </Typography>
                        )}
                      </TableCell>
                    );
                  } else {
                    return '';
                  }
                })}
            </StickyTableCell>

            {header?.map((col: any, index: number) => {
              if (!leftSticky || index >= leftSticky) {
                return (
                  <TableCell
                    style={col.sx}
                    key={col.key}
                    classes={{ root: classes.cellHeaderSticky }}
                  >
                    {col.sort ? (
                      <TableSortLabel>
                        <Typography
                          variant="body2"
                          style={col.sx}
                          classes={{ root: classes.textHeader }}
                        >
                          {col.label}
                        </Typography>
                      </TableSortLabel>
                    ) : (
                      <Typography
                        variant="body2"
                        style={col.sx}
                        classes={{ root: classes.textHeader }}
                      >
                        {col.label}
                      </Typography>
                    )}
                  </TableCell>
                );
              } else {
                return '';
              }
            })}
            {renderManage && (
              <TableCell classes={{ root: classes.cellStickyHeaderRight }}>
                <Typography
                  classes={{ root: classes.textHeader }}
                  variant="body2"
                >
                  {manageName || t('Manage')}
                </Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * perPage, page * perPage + perPage)?.map(row => (
            <TableRow key={row.id} hover role="checkbox">
              <StickyTableCell>
                {handleSelectRow && (
                  <TableCell
                    size="small"
                    style={{
                      width: '50px',
                      border: 'none',
                      padding: '6px !important'
                    }}
                    component="td"
                  >
                    <Checkbox
                      color="primary"
                      checked={isSelected(row)}
                      inputProps={{ 'aria-labelledby': row.id }}
                      onChange={e => onSelectClick(e, row)}
                    />
                  </TableCell>
                )}
                {leftSticky &&
                  header.map((cell: any, index: number) => {
                    if (index < leftSticky) {
                      return (
                        <TableCell
                          sx={
                            cell && {
                              ...cell.sx,
                              ...{ padding: '6px !important' }
                            }
                          }
                          onClick={e => {
                            if (cell.onClick) {
                              cell.onClick && cell.onClick(e, row, cell);
                              setCurrentCell({ row: row, cell: cell });
                            }
                          }}
                          style={{
                            border: 'none',
                            backgroundColor:
                              currentCell.row &&
                              currentCell.cell &&
                              currentCell.row.id === row.id &&
                              currentCell.cell.key === cell.key
                                ? '#f5f5f5'
                                : '#fff'
                          }}
                          key={`${cell.key}-${row.id}`}
                        >
                          {renderCellData(row, cell)}
                        </TableCell>
                      );
                    } else {
                      return '';
                    }
                  })}
              </StickyTableCell>

              {header.map((cell: any, index: number) => {
                if (!leftSticky || index >= leftSticky) {
                  return (
                    <TableCell
                      sx={
                        cell && {
                          ...cell.sx,
                          ...{ padding: '6px !important' }
                        }
                      }
                      onClick={e => {
                        if (cell.onClick) {
                          cell.onClick && cell.onClick(e, row, cell);
                          setCurrentCell({ row: row, cell: cell });
                        }
                      }}
                      style={{
                        padding: '6px !important'
                      }}
                      key={`${cell.key}-${row.id}`}
                    >
                      {renderCellData(row, cell)}
                    </TableCell>
                  );
                } else {
                  return '';
                }
              })}
              {renderManage && (
                <TableCell className={classes.cellStickyRight} style={{}}>
                  <div className={classes.coverBtnAction}>
                    {renderManage(row)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BaseTable;
