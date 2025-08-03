import caretUp from '../../assets/images/home/caretUp.png';
import caretDown from '../../assets/images/home/caretDown.png';
import caretKeep from '../../assets/images/home/caretKeep.png';

export const getRankChangeIcon = (status: 'UP' | 'DOWN' | 'SAME') => {
  switch (status) {
    case 'UP':
      return caretUp;
    case 'DOWN':
      return caretDown;
    case 'SAME':
    default:
      return caretKeep;
  }
};
