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
  return (
    <div style={{dispay:'relative'}}>
      <div className="bb-container grid-x">
        <div className="bb-button back medium-6 cell">
          <span>Back</span>
        </div>
        <div className="bb-button next medium-6 cell">
          <span>Next</span>
        </div>
        <div className="bb-button skip">
            <span>Skip</span>
        </div>
      </div>
    </div>
  );
};
