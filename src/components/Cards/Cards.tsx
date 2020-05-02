import React from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import CountUp from "react-countup";
import cx from 'classnames';
const styles = require('./Cards.module.css');

const Cards = (props: any) => {
    const {confirmed, recovered, deaths, last_update} = props.data;
    if (!confirmed){
        return (<h1>Loading...</h1>);
    }
    return (
        <div className={styles.card_container}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{last_update}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{last_update}</Typography>
                        <Typography variant="body2">Number of recovered cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={deaths}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{last_update}</Typography>
                        <Typography variant="body2">Number of death cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
};

export default Cards