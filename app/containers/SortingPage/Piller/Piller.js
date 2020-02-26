import React from 'react';
import './Piller.scss';
class Piller extends React.Component {
  render() {
    const { height, white, pointer } = this.props;

    let color = [
      '#0501fa',
      '#0a02f5',
      '#0f03f0',
      '#1404eb',
      '#1905e6',
      '#1e06e1',
      '#2307dc',
      '#2808d7',
      '#2d09d2',
      '#320acd',
      '#370bc8',
      '#3c0cc3',
      '#410dbe',
      '#460eb9',
      '#4b0fb4',
      '#5010af',
      '#5511aa',
      '#5a12a5',
      '#5f13a0',
      '#64149b',
      '#691596',
      '#6e1691',
      '#73178c',
      '#781887',
      '#7d1982',
      '#821a7d',
      '#871b78',
      '#8c1c73',
      '#911d6e',
      '#961e69',
      '#9b1f64',
      '#a0205f',
      '#a5215a',
      '#aa2255',
      '#af2350',
      '#b4244b',
      '#b92546',
      '#be2641',
      '#c3273c',
      '#c82837',
      '#cd2932',
      '#d22a2d',
      '#d72b28',
      '#dc2c23',
      '#e12d1e',
      '#e62e19',
      '#eb2f14',
      '#f0300f',
      '#f5310a',
      '#fa3205',
    ];
    if (white) {
      color[height] = 'white';
    }

    return (
      <div
        className="piller"
        key={color[height]}
        style={{
          backgroundColor: color[height],
          height: `${height * 2}%`,
          minWidth: '',
          flexGrow: 1,
        }}
        >
            { pointer.length>0 && <div className="pointer" style={{background: pointer[pointer.length - 1].color}} ></div> }
        </div>
    );
  }
}

export default Piller;
