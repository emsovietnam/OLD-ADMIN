export const BREAKPOINT = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400
};

export const COLOR = {
  BLUE: '#0d6efd'
};

export const BUTTON_STYLE: any = {
  margin: 0.25,
  height: '32px',
  textTransform: 'none',
  padding: '8px 16px 8px 12px',
  borderRadius: '5px',
  '& span span i': {
    fontSize: '15px !important'
  },
  boxShadow: 0
};

export const boxShadow: any = {
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2) !important',
  border: '1px solid rgba(0,0,0,0.10)',
  borderBottom: '0'
};

export const modalBackdrop = {
  style: { backgroundColor: 'rgba(255,255,255,0.6)' }
};

export const buttonStyle: any = {
  color: '#1877e2 !important',
  marginRight: 10,
  fontSize: 15,
  fontWeight: 600
};

export const scrollStyle = {
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#bdbdbd',
    borderRadius: 10
  }
};

export const scrollStyleNotrack = {
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#bdbdbd',
    borderRadius: 10
  }
};
