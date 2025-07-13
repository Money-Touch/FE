import commentIcon from '../../assets/images/home/notify/comment.png';
import upIcon from '../../assets/images/home/notify/up.png';
import downIcon from '../../assets/images/home/notify/down.png';
import achievementIcon from '../../assets/images/home/notify/achievement.png';
import warningIcon from '../../assets/images/home/notify/cafe.png';
import reminderIcon from '../../assets/images/home/notify/fixed.png';
import todayIcon from '../../assets/images/home/notify/today.png';

export const typeToIcon = {
  COMMENT: commentIcon,
  REACTION_UP: upIcon,
  REACTION_DOWN: downIcon,
  ACHIEVEMENT: achievementIcon,
  WARNING: warningIcon,
  REMINDER: reminderIcon,
  TODAY: todayIcon,
};

export const hasThumbnail = (type: string) =>
  type === 'COMMENT' || type === 'REACTION_UP' || type === 'REACTION_DOWN';
