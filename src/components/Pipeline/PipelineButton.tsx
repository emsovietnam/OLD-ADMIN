import { Box, Button, Tab, Tabs, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LensTwoTone } from '@mui/icons-material';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { collapseString } from 'src/common/string';

const useStyles = makeStyles({
  root: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    minWidth: 700,
    borderRadius: 8,
    boxShadow: '0px 2px 5px 1px rgb(64 60 67 / 12%)'
  },

  tabs: {
    width: '60%',
    height: '100%'
  },
  tabPipeline: {
    width: 'fit-content !important',
    minWidth: '85px !important',
    borderRadius: '8px !important',
    height: '82% !important',
    minHeight: '0 !important',
    border: 1,
    borderColor: 'divider',
    margin: '0 5px !important',
    textTransform: 'none !important' as any
  },
  selectTabFirst: {
    transition: '0.5s',
    width: '100%',
    height: '100%',
    background: `linear-gradient(to right)`
  },
  selectTabMiddleLast: {
    transition: '0.5s',
    width: '100%',
    height: '100%',
    background: `linear-gradient(to right)`,
    margin: '0 10px !important'
  },
  parent: {
    height: '46px',
    display: 'flex',
    alignItems: 'center'
  },
  indicator: {
    display: 'none'
  },
  rootTab: {
    alignItems: 'center'
  },
  flexTabContainer: {
    height: 32,
    alignItems: 'center'
    // padding: '0 px'
  },
  tabDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%',
    height: 32,
    margin: 'auto 0 auto 10px',
    borderRadius: 50,
    border: '0.1px solid #ccc'
  }
});

const InitialDataItems = [
  {
    id: 1,
    text: 'Item 1 hahahah lal lalal lala ',
    color: '#2196f3'
  },
  {
    id: 2,
    text: 'item 2',
    color: '#E53935'
  },
  {
    id: 3,
    text: 'item 3',
    color: '#FF9800'
  },
  {
    id: 4,
    text: 'item 4',
    color: '#4CAF50'
  },
  {
    id: 5,
    text: 'item 5',
    color: '#03A9F4'
  },
  {
    id: 6,
    text: 'item 6',
    color: '#351C75'
  },
  {
    id: 7,
    text: 'item 7',
    color: '#37474f'
  }
];

function PipelineButton(props) {
  let { dataItems, onChange, style, multiple, initialValue } = props;
  const classes = useStyles();
  const [values, setValues] = React.useState([] as any);
  if (!dataItems) dataItems = InitialDataItems;

  const handleChange = (newValue: any) => {
    if (multiple) {
      let val = cloneDeep(values);
      if (!val.includes(newValue.id)) {
        val.push(newValue.id);
        setValues(val);
      } else {
        let index = val.indexOf(newValue.id);
        if (index !== -1) {
          val.splice(index, 1);
        }
        setValues(val);
      }
      if (typeof onChange === 'function') onChange(val);
    } else {
      if (values.includes(newValue.id)) {
        setValues([]);
        if (typeof onChange === 'function') onChange(null);
      } else {
        setValues([newValue.id]);
        if (typeof onChange === 'function') onChange(newValue);
      }
    }
  };
  useEffect(() => {
    if (initialValue) {
      setValues(initialValue);
    }
  }, [JSON.stringify(initialValue)]);
  return (
    <Box sx={{ padding: '16px', width: '100%', overflow: 'auto' }}>
      {dataItems.map((item, index) => (
        <Tooltip title={item.text} key={index}>
          <Button
            size="small"
            style={{
              borderRadius: '5px',
              height: 28,
              marginLeft: 7,
              color: values.includes(item.id) ? 'white' : item.color,
              backgroundColor: values.includes(item.id) ? item.color : '',
              border: `1px solid ${item.color}`,
              textTransform: 'none'
            }}
            onClick={() => {
              handleChange(item);
            }}
            variant="outlined"
            color="primary"
          >
            {item.text}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}

export default PipelineButton;
