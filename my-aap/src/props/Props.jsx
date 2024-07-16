import React from 'react';

const GreetComponent = (props) => {
  const styles = {
    divStyles: {
      background: 'red',
      height: '150px',
      width: '300px',
      color:"white",
    
    }
  };

  return (
    <div style={styles.divStyles}>
      Hello, {props.name}! We are learning props in react.
    </div>
  );
};

export default GreetComponent;
