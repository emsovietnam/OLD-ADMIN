import {
  Grid,
  TablePagination,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputBase
} from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
const theme = createTheme();

interface PropType {
  handleChange?: Function;
  total: number;
  pageSizeOptions?: Array<number>;
  rowsPerPage?: number;
}

const useStyles = makeStyles(() => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const BootstrapInput = withStyles(() => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const BasePaginate = (props: PropType) => {
  const { total, handleChange, pageSizeOptions, rowsPerPage } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const [pagination, setPagination] = React.useState({
    page: 0,
    perPage: pageSizeOptions ? pageSizeOptions[0] : 10,
    pageSizeOptions: pageSizeOptions || [10, 20, 50]
  });
  const handleChangePage = (event, newPage) => {
    setPagination(preValue => {
      let temp = cloneDeep(preValue);
      temp.page = newPage;

      return temp;
    });
  };
  const handleChangeRowsPerPage = event => {
    setPagination({
      page: 0,
      perPage: +event.target.value,
      pageSizeOptions: pageSizeOptions || [10, 20, 50]
    });
  };
  useEffect(() => {
    if (handleChange) {
      handleChange(pagination);
    }
  }, [JSON.stringify(pagination)]);
  useEffect(() => {
    setPagination({
      page: 0,
      perPage: pageSizeOptions ? pageSizeOptions[0] : 10,
      pageSizeOptions: pageSizeOptions || [10, 20, 50]
    });
  }, [total]);

  const selectPage = () => {
    var listPage: any = [];
    if (total && rowsPerPage) {
      for (var i = 0; i < Math.ceil(total / rowsPerPage); i++) {
        listPage.push(
          <MenuItem key={i} value={i}>
            {i + 1}
          </MenuItem>
        );
      }
    }
    return listPage;
  };

  return (
    <Grid container spacing={2}>
      {total > 0 && (
        <>
          <Grid
            xs={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 14,
              marginTop: '2px'
            }}
            item
          >
            {t('Total')}: {total}
          </Grid>
          <Grid
            xs={10}
            item
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            {total && rowsPerPage && (
              <>
                <Typography
                  variant="body2"
                  style={{ marginRight: '10px' }}
                >{`${t('Jump to page')}: `}</Typography>
                <FormControl className={classes.margin}>
                  <Select
                    id="demo-simple-select"
                    labelId="demo-customized-select-label"
                    value={pagination.page}
                    onChange={event => {
                      handleChangePage(event, event.target.value);
                    }}
                    style={{ maxHeight: '50px', overflowY: 'auto' }}
                    input={<BootstrapInput />}
                  >
                    {selectPage()}
                  </Select>
                </FormControl>
              </>
            )}
            <TablePagination
              rowsPerPageOptions={pagination.pageSizeOptions}
              labelRowsPerPage={t('Rows per page') + ':'}
              component="div"
              count={total}
              rowsPerPage={pagination.perPage}
              page={pagination.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default BasePaginate;
