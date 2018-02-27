import * as React from "react";
import "./button-bar.css";
// const styles = {
//     container: {
//         height: 50,
//         width: '100%',
//         display: 'flex',
//         justifyItems: 'space-around',
//         color: 'white',
//         fontSize: 20
//     },
//     next: {
//         width: '100%',
//         background: '#1B93EE',
//         textAlign:'center'
//     },
//     back: {
//         width: '100%',
//         background: '#A8AEBB',
//         textAlign: 'center'
//     }
// }
export const ButtonBar = props => {
  const { next, previous, cantSkip } = props;
  return (
    <div style={{dispay:'relative'}}>
      <div className="bb-container grid-x" style={{bottom: cantSkip ? 0 : 50}}>
        <div className="bb-button back medium-6 cell" onClick={() => previous()}>
          <span>Back</span>
        </div>
        <div className="bb-button next medium-6 cell" onClick={() => next()}>
          <span>Next</span>
        </div>
        <div hidden={cantSkip} className="bb-button skip" onClick={() => next()}>
            <span>Skip</span>
        </div>
      </div>
    </div>
  );
};
