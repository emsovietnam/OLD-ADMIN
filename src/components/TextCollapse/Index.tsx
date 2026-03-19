import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import reactStringReplace from 'react-string-replace';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: 300
  },
  textSee: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    },
    cursor: 'pointer'
  },
  textLink: {
    color: '#2374E1',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      color: '#6f2da8'
    },
    cursor: 'pointer'
  },
  wrapText: {
    whiteSpace: 'pre-wrap',
    fontSize: '15px',
    '& > a': {
      color: '#1876f2 !important',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': '5',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  }
}));

interface PropType {
  data?: any;
  type?: any;
  status_tags?: any;
  info?: any;
  typeShare?: any;
}

function TextCollapse(props: PropType) {
  let { data, type, status_tags, info, typeShare } = props;
  const classes = useStyles();
  const contentRef: any = React.useRef(null);
  const [checked, setChecked] = React.useState(false);
  const [longParagraph, setLongParagraph] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const theme = useTheme();

  let textRender;

  React.useEffect(() => {
    // get number of line
    let ref = contentRef?.current?.clientHeight;
    let lineHeightEl = Number(
      contentRef?.current?.style?.lineHeight?.slice(0, -2)
    );
    let lineAmount = ref / lineHeightEl;

    // set true whether number of line larger than 6
    if (lineAmount > 5) {
      setLongParagraph(true);
    } else {
      setLongParagraph(false);
    }
  }, [contentRef]);

  const convertText = (data: any) => {
    if (typeof data === 'string') {
      if (data?.startsWith('<') && typeof data === 'string') {
        let temp = document.createElement('div');
        temp.innerHTML = data;
        return temp.innerText || temp.textContent;
      }
    }

    return reactStringReplace(
      reactStringReplace(
        reactStringReplace(
          data,
          /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
          (match, i) => {
            return (
              <a
                key={match + i}
                href={match}
                target="_blank"
                rel="noreferrer"
                className={classes.textLink}
              >
                {match}
              </a>
            );
          }
        ),
        /(#[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
        (match, i) => {
          return (
            <a
              key={match + i}
              href={`/hashtag/${match.slice(1)}`}
              className={classes.textLink}
            >
              {match}
            </a>
          );
        }
      ),
      /(\[\d+\])/gm,
      (match, i, offset) => {
        let objectMentions = status_tags?.find(
          el => el.entity_id === match.slice(1, match.length - 1)
        );
        let href = `/${
          objectMentions?.entity_type === 'Account'
            ? 'user'
            : objectMentions?.entity_type === 'Page'
            ? 'page'
            : 'group'
        }/${objectMentions?.entity_id}`;
        return (
          <a style={{ color: '#006eff' }} key={match + i} href={href}>
            {objectMentions?.name}
          </a>
        );
      }
    );
  };

  textRender = (
    <Box sx={{ color: theme.palette.mode === 'dark' ? '#e5e5e5' : '#050505' }}>
      <p
        ref={contentRef}
        style={{ lineHeight: '20px' }}
        className={longParagraph && !checked ? classes.lineClamp : ''}
      >
        {convertText(data)}
      </p>

      {longParagraph &&
        (!checked ? (
          <span className={classes.textSee} onClick={handleChange}>
            &nbsp;Xem thêm
          </span>
        ) : (
          <span className={classes.textSee} onClick={handleChange}>
            Thu gọn
          </span>
        ))}
    </Box>
  );

  return (
    <div
      className={classes.wrapText}
      style={{
        fontSize:
          data?.length < 30 && type && typeShare !== 'share-messenger'
            ? 24
            : 15,
        opacity: info?.forbidden_words?.length > 0 ? '0.5' : '1'
      }}
    >
      {textRender}
    </div>
  );
}

export default TextCollapse;
