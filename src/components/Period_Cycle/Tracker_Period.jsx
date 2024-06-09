import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Hidden from "@mui/material/Hidden";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "./TrackPeriod.css";
import TrackResults from "./TrackResults";
import TopNavbar from "../Nav/TopNavbar";
import Footer from "../Sections/Footer";
import { toast, Toaster } from "react-hot-toast";

function TrackPeriod() {
  const [date, setDate] = useState(new Date()); // current time
  const [count, setCount] = useState(5);
  const [cycleCount, setCycleCount] = useState(28);
  const [doReveal, setDoReveal] = useState(false);

  const handleDaysLast = (isMinus) => {
    if (isMinus) {
      if (count > 1) {
        setCount(count - 1);
      } else {
        setCount(10);
      }
    } else {
      if (count >= 10) {
        setCount(1);
      } else {
        setCount(count + 1);
      }
    }
  };

  const handleMenstrualCycle = (isMinus) => {
    if (isMinus) {
      if (cycleCount > 18) {
        setCycleCount(cycleCount - 1);
      } else {
        setCycleCount(40);
      }
    } else {
      if (cycleCount >= 40) {
        setCycleCount(18);
      } else {
        setCycleCount(cycleCount + 1);
      }
    }
  };

  const generatePDF = () => {
    var doc = new jsPDF("l", "pt", "A3");
    doc.html(document.querySelector("#Results"), {
      callback: function (pdf) {
        pdf.save("Shewin_Tracker_Results.pdf");
      },
    });
    toast.success("PDF Generated");
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#FA4C86",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "#FA4C86",
              secondary: "black",
            },
          },
        }}
      />
      <TopNavbar />
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {!doReveal && (
            <Grid
              container
              style={{
                backgroundColor: "#E8DEFF",
                textAlign: "center",
                borderRadius: "15px",
                padding: "10px",
              }}
            >
              <Grid item xs={12} md={4}>
                <Box my={3}>
                  <Typography variant="h6">
                    When did your last period start?
                  </Typography>
                </Box>

                <Box>
                  <Grid
                    container
                    style={{ textAlign: "center", display: "flex" }}
                  >
                    <Grid item xs={6}>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        customInput={
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <EventNoteIcon />
                            <Typography variant="body1">
                              {date.toDateString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "left" }}>
                      <Box>
                        <Box className="date-day">
                          {date.toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </Box>
                        <Box className="date-day">
                          {date.toLocaleDateString("en-US", { month: "long" })}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box my={3}>
                  <Typography variant="h6">
                    How many days did it last?
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleDaysLast(true)}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box className="days-count" mx={5}>
                    {count}
                  </Box>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleDaysLast(false)}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box my={3}>
                  <Typography variant="h6">
                    Duration of menstrual cycle?
                  </Typography>
                </Box>
                <Box
                  mt={"auto"}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleMenstrualCycle(true)}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box className="days-count" mx={5}>
                    {cycleCount}
                  </Box>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleMenstrualCycle(false)}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} style={{ textAlign: "center" }}>
                {!doReveal ? (
                  <Box my={3}>
                    <Button
                      variant="contained"
                      className="track-button"
                      onClick={() => setDoReveal(true)}
                    >
                      Track Now
                    </Button>
                  </Box>
                ) : (
                  <Box my={3}>
                    <Button
                      component="a"
                      href="#Results"
                      color="secondary"
                      variant="contained"
                    >
                      Look below
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
          <Box></Box>

          {/* Results */}
          {doReveal ? (
            <Box mt={10}>
              <Grid container id="Results">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Box
                    my={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: "20px",
                    }}
                  >
                    <Button
                      component="a"
                      href="/track"
                      className="track-button"
                      style={{ color: "white", fontWeight: "500" }}
                    >
                      Back
                    </Button>
                    <Typography variant="h5">
                      Menstruation estimation for the next 3 months
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    {/* ========================================= RESULTS ========================================= */}
                    <TrackResults
                      startPeriodDate={date}
                      daysLast={count}
                      cycleCount={cycleCount}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Box mt={5}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Please note that this is only an estimation of your
                      menstrual cycle.
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Hidden smUp>
                      <Button
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                        className="track-button"
                        onClick={generatePDF}
                      >
                        Download current month
                      </Button>
                    </Hidden>
                    <Hidden smDown>
                      <Button
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                        className="track-button"
                        onClick={generatePDF}
                      >
                        Download your calendar
                      </Button>
                    </Hidden>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </Box>
      </div>
      <Footer />
    </>
  );
}

export default TrackPeriod;
