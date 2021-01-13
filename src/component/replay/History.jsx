import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useAuth } from '../useAuth';
import { fetchHistory } from '../../service/api';
import Pagination from "@material-ui/lab/Pagination";
import {
  Container, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Grid, TextField, Typography, Link, Card, CardMedia, CardContent, CardActions, CssBaseline, Box
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function History() {
  const classes = useStyles();
  const { token } = useAuth();
  const [list, setList] = useState([]);
  const history = useHistory();
  const [page, setPage] = useState(1);
  async function fetchData() {
    const games = await fetchHistory(token, page);
    console.log('Game la:', games);
    setList(games);
  }

  useEffect(() => {
    fetchData();
  }, [page]);


  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            Played matches
          </Typography>

        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {list && list.map((value, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://image.winudf.com/v2/image1/Y29tLnBvcG9rby5nb21va3V2bl9pY29uXzE1NzU1NTYyNjVfMDI0/icon.png?w=170&fakeurl=1"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>

                  <Typography align="center">
                    <Box fontWeight={700}>
                      {value.user1 ? value.user1.username : "      "}
                    </Box>
                  </Typography>
                  <Typography align="center">
                    vs
                  </Typography>
                  <Typography align="center">
                    <Box fontWeight={700} mb={2}>
                      {value.user2 ? value.user2.username : "      "}
                    </Box>
                  </Typography>
                  <Typography align="center">
                    <Box fontWeight={700} mb={2}>
                      {(value.winner && value.winner !== null) ? `Winner: ${value.winner}` :
                        "Draw"}
                    </Box>
                  </Typography>
                  <Typography>

                    Date: {value.date.slice(0, 10)}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="small" color="primary"
                    onClick={() => {
                      history.push(`/history/${value._id}`);
                    }}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
        <Grid md={12} align="center" justify="center" direction="column">
          <Pagination count={10} page={page} onChange={async (event, page) => {
            setPage(page);
          }} color="primary" />
        </Grid>
      </Container>
    </React.Fragment>
  )
}
