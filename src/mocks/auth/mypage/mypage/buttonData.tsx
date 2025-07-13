import { loadImages } from '../../../../utils/common/loadImages';

const images = loadImages('mypageButton');

const ButtonData = [
  {
    id: 1,
    name: 'MY 피드',
    link: '/mypage/feed',
    image: images['myFeed'],
  },
  {
    id: 2,
    name: 'MY 배지',
    link: '/mypage/badge',
    image: images['myBadge'],
  },
];

export default ButtonData;
