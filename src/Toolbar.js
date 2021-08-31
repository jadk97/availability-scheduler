import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/styles";

const toolbarStyles = (theme) => ({
  icon: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: "#0368aa",
    color: "white",
    cursor: "pointer",
  },
  typography: {
    "font-family": '"Source Sans Pro", sans-serif',
    lineHeight: 1.35,
    paddingBottom: 8,
    cursor: "pointer",
    textAlign: 'center',
  },
});
// const toolbarClasses = toolbarStyles();

const CalendarToolbar = (props) => {
  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      spacing={2}
      marginBottom={3}
    >
      <Grid item>
        <Typography
          className={props.classes.typography}
          fontSize={20}
         
          onClick={() => props.onNavigate("TODAY")}
        >
          Availability
        </Typography>
      </Grid>
    </Grid>
  );
};

CalendarToolbar.propTypes = {
  classes: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
};

export default withStyles(toolbarStyles)(CalendarToolbar);
