// import * as React from 'react';
// import {Text, View} from 'react-native';
// import { Switch } from 'react-native-paper';

// export default class MyComponent extends React.Component {
//   state = {
//     isSwitchOn: false,
//   };

//   render() {
//     const { isSwitchOn } = this.state;
//     return (
//       <View>
//       <Switch
//         value={isSwitchOn}
//         onValueChange={() =>
//           { this.setState({ isSwitchOn: !isSwitchOn }); }
//         }
//       />
//       {isSwitchOn ? <Text>Hi </Text> : <Text>Hello </Text>}
//       </View>
//     );
//   }
// }


import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

const Instruction = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...props} style={style}>
      { children }
    </View>
  );
};

Instruction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  style: View.propTypes.style,
  hide: PropTypes.bool,
};

export default Instruction;

