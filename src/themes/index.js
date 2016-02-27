import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

export default getMuiTheme({
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.green500,
    primary2Color: Colors.green700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.deepOrange500,
    accent2Color: Colors.deepOrange100,
    accent3Color: Colors.deepOrange500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.green500,
  }
});