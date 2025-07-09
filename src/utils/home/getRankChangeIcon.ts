import caretUp from '../../assets/images/home/caretUp.png';
import caretDown from '../../assets/images/home/caretDown.png';
import caretKeep from '../../assets/images/home/caretKeep.png';

export const getRankChangeIcon = (
  current: number,
  previous: number,
): string => {
  if (current < previous) return caretUp;
  if (current > previous) return caretDown;
  return caretKeep;
};
