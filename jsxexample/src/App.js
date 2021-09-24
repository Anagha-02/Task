import React, { useState } from "react";
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  divStyle: {
    alignItems: 'center',
    margin:50
  },
  bgRed: {
    background: 'red',
    align: 'center'
  },
  bgBlue: {
    background: 'blue',
    align: 'center'
  }
})

function Button({ children, ...props }) {
  const [toggle, setToggle] = useState(true);
  const classes = useStyles({ ...props })

  const onClickHandler = () => {
    setToggle(!toggle);
  }

  return (
    <div className={classes.divStyle}>
      <button className={toggle ? classes.bgRed : classes.bgBlue} onClick={onClickHandler}>
        <span>{children}</span>
      </button>
    </div>
  )
}

const App = () =>
  <Button> Submit </Button>

export { App };

/*
let toggle = true;

const useStyles = createUseStyles((theme) => (
  {
    myButton: {
      toggle: theme.toggleNew
    },
    myLabel: (props) => (toggle ? {
      background: 'red',
      align: 'center'
    } :
      {
        background: 'blue',
        align: 'center'
      }
    )
  }
))

const theme = {
  toggleNew: true,
  colorSecondary: 'blue'
}

const onClickHandler = () => {
  toggle = !toggle;
  console.log(toggle);
}

const Button = ({ children, ...props }) => {
  const theme = useTheme()
  const classes = useStyles({...props, theme})
  return (
    <button className={toggle ? classes.bgRed : classes.bgBlue} onClick={onClickHandler}>
      <span>{children}</span>
    </button>
  )
}


const App = () =>
  <Button>Submit</Button>

export { App };
*/