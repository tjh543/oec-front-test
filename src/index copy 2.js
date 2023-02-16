import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './index.css';

const Index = ({ children, label, onOpen, onClose }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    console.log('close');
    setAnchorEl(null);
    onClose?.();
  };

  const open = Boolean(anchorEl);
  console.log({ open });
  const id = open ? 'simple-popover' : undefined;
  const StyledPopover = withStyles({
    paper: {
      border: '1px solid #2DA20D',
      boxShadow: '0 0 0!important',
      padding: '20px 10px',
      fontSize: 14,
    },
  })((props) => <Popover {...props} />);

  return (
    <div>
      <button variant="contained" onClick={handleClick} className="btn">
        <span>{label}</span> <KeyboardArrowDownIcon style={{ fontSize: 20 }} />
      </button>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
      </StyledPopover>
    </div>
  );
};

export default Index;
