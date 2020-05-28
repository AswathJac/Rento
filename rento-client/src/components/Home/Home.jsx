import React from "react";
import styles from "./Home.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.person}>
                <PersonIcon className={styles.personIcon} />
            </div>
            <h1 className={styles.heading}>
                Book your ride on{" "}
                <span className={styles.subheading}>Rento</span> !
            </h1>
            <Link to="/select-car" style={{ textDecoration: "none" }}>
                <Button className={styles.button}>
                    Book Now!
                    <ArrowForwardIosRoundedIcon
                        color="white"
                        style={{ position: "relative", right: -30 }}
                    />
                </Button>
            </Link>
        </div>
    );
};

export default Home;
