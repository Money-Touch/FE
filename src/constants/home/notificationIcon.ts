import commentIcon from '../../assets/images/home/notify/comment.png';
import upIcon from '../../assets/images/home/notify/up.png';
import downIcon from '../../assets/images/home/notify/down.png';
import achievementIcon from '../../assets/images/home/notify/achievement.png';
import warningIcon from '../../assets/images/home/notify/cafe.png';
import reminderIcon from '../../assets/images/home/notify/fixed.png';
import todayIcon from '../../assets/images/home/notify/today.png';

export const typeToIcon = {
  COMMENT: commentIcon,
  WISE: upIcon,
  WASTE: downIcon,
  GOAL: achievementIcon,
  COFFEE: warningIcon,
  FIXED_COST: reminderIcon,
  BUDGET: todayIcon,
};

export const hasThumbnail = (type: string) =>
  type === 'COMMENT' || type === 'WISE' || type === 'WASTE';
