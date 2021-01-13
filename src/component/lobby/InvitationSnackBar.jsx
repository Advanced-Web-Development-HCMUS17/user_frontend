import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function InvitationSnackBar({gameRoom, playerName}) {
  const classes = useStyles();
  const action = (
    <Button color="secondary" size="small">
      Join
    </Button>
  );
  return (
    <div className={classes.root}>
      <SnackbarContent message={`${playerName} invited you for a game`} action={action}/>
    </div>);
}

