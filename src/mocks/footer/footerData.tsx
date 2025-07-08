import { loadImages } from '../../utils/footer/loadImages';

const images = loadImages();

const FooterData = [
  {
    id: 1,
    name: '홈',
    link: '/home',
    image: images['home'],
    imageClick: images['homeClick'],
  },
  {
    id: 2,
    name: '가계부',
    link: '/money',
    image: images['write'],
    imageClick: images['writeClick'],
  },
  {
    id: 3,
    name: '피드',
    link: '/feed',
    image: images['plus'],
    imageClick: images['plusClick'],
  },
  {
    id: 4,
    name: '마이',
    link: '/mypage',
    image: images['person'],
    imageClick: images['personClick'],
  },
];

export default FooterData;
