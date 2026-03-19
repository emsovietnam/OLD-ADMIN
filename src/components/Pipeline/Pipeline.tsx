import { Box, Tab, Tabs, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
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
    borderRadius: '5px !important',
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
    borderRadius: 20,
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

function Pipeline(props) {
  let { dataItems, onChange, style } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(false);
  if (!dataItems) dataItems = InitialDataItems;

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    let itemChecked = dataItems[newValue];
    if (typeof onChange === 'function') onChange(itemChecked);
  };

  return (
    <Tabs
      className={classes.tabs}
      style={style}
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
      classes={{
        root: classes.rootTab,
        scroller: classes.parent,
        indicator: classes.indicator,
        flexContainer: classes.flexTabContainer
      }}
    >
      {dataItems.map((tab, index) => (
        <Tooltip title={tab.text} key={index}>
          <Tab
            key={tab.id}
            label={
              <div className={classes.tabDiv}>
                {collapseString(tab.text, 19)}
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: tab.color,
                    borderRadius: '50%',
                    marginLeft: 7
                  }}
                />
              </div>
            }
            style={{
              color: value === index ? 'white' : tab.color,
              backgroundColor: value === index ? tab.color : '',
              border: `1px solid ${tab.color}`
            }}
            className={classes.tabPipeline}
            classes={{
              selected:
                index === 0
                  ? classes.selectTabFirst
                  : classes.selectTabMiddleLast
            }}
          />
        </Tooltip>
      ))}
    </Tabs>
  );
}

export default Pipeline;
