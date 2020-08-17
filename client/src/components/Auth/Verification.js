import React from 'react';
import { connect } from 'react-redux';

const Verification = (props) => {
  const disableTime = 60;
  const [time, setTime] = React.useState(-1);
  const [disabled, setDisabled] = React.useState(false);
  let buttonText = `${props.children}`;
  buttonText += disabled ? ` (${time})` : '';
  let interval;
  console.log('before useEffect');
  React.useEffect(() => {
    if (disabled) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }
    return () => {
      console.log('cleanup useEffect');
      clearInterval(interval);
      if (time === 0) {
        setDisabled(false);
        setTime(disableTime);
      }
    };
  }, [time, disabled]);

  const startTimer = () => {
    setDisabled(true);
    setTime(disableTime);
  };
  return (
    <button
      className={`button auth-button-form ${disabled ? 'disabled' : ''} `}
      onClick={() => startTimer()}
      type='button'
      disabled={disabled}
    >{`${buttonText}`}</button>
  );
};

export default connect()(Verification);
