import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Grid from "@mui/material/Grid";

function TrackResults({ startPeriodDate, daysLast, cycleCount }) {
  const [startDate, setStartDate] = useState(startPeriodDate.clone().toDate());
  const [endDate, setEndDate] = useState(
    startPeriodDate.clone().add(daysLast, "days").toDate()
  );
  const [initialMonth, setInitialMonth] = useState(
    startPeriodDate.clone().toDate()
  );
  const [menses, setMenses] = useState([
    startPeriodDate.clone().toDate(),
    startPeriodDate.clone().add(daysLast, "days").toDate(),
  ]);
  const [isMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    setStartDate(startPeriodDate.clone().toDate());
    setEndDate(startPeriodDate.clone().add(daysLast, "days").toDate());
    setMenses([
      startPeriodDate.clone().toDate(),
      startPeriodDate.clone().add(daysLast, "days").toDate(),
    ]);
    setInitialMonth(null);
    setTimeout(() => setInitialMonth(startPeriodDate.clone().toDate()), 300);
  }, [startPeriodDate, daysLast]);

  const check = (momentDate) => {
    return (
      momentDate.isBetween(
        moment(menses[0]).clone().subtract(1, "days"),
        moment(menses[1]).clone()
      ) ||
      momentDate.isBetween(
        moment(menses[0]).clone().add(cycleCount, "days").subtract(1, "days"),
        moment(menses[1]).clone().add(cycleCount, "days")
      ) ||
      momentDate.isBetween(
        moment(menses[0])
          .clone()
          .add(cycleCount * 2, "days")
          .subtract(1, "days"),
        moment(menses[1])
          .clone()
          .add(cycleCount * 2, "days")
      ) ||
      momentDate.isBetween(
        moment(menses[0])
          .clone()
          .add(cycleCount * 3, "days")
          .subtract(1, "days"),
        moment(menses[1])
          .clone()
          .add(cycleCount * 3, "days")
      )
    );
  };

  const checkHighlight = (momentDate) => {
    return (
      momentDate.isBetween(
        moment(menses[0]).clone().subtract(1, "days"),
        moment(menses[1]).clone().subtract(1, "days")
      ) ||
      momentDate.isBetween(
        moment(menses[0]).clone().add(cycleCount, "days").subtract(1, "days"),
        moment(menses[1]).clone().add(cycleCount, "days").subtract(1, "days")
      ) ||
      momentDate.isBetween(
        moment(menses[0])
          .clone()
          .add(cycleCount * 2, "days")
          .subtract(1, "days"),
        moment(menses[1])
          .clone()
          .add(cycleCount * 2, "days")
          .subtract(1, "days")
      ) ||
      momentDate.isBetween(
        moment(menses[0])
          .clone()
          .add(cycleCount * 3, "days")
          .subtract(1, "days"),
        moment(menses[1])
          .clone()
          .add(cycleCount * 3, "days")
          .subtract(1, "days")
      )
    );
  };

  const renderDayContents = (date) => {
    const momentDate = moment(date);
    return (
      <Grid container>
        <Grid item xs={12}>
          {check(momentDate) ? (
            <span style={{ fontSize: "100%" }}>🩸</span>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          {momentDate.date()}
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        showMonthDropdown
        showYearDropdown
        highlightDates={[
          ...Array.from({ length: 3 }, (_, i) => ({
            "highlighted-day": [
              moment(menses[0])
                .add(cycleCount * i, "days")
                .toDate(),
              moment(menses[1])
                .add(cycleCount * i, "days")
                .toDate(),
            ],
          })),
        ]}
        dayClassName={(date) =>
          checkHighlight(moment(date)) ? "highlighted-day" : undefined
        }
        renderDayContents={(date) => renderDayContents(date)}
      />
    </div>
  );
}

export default TrackResults;
