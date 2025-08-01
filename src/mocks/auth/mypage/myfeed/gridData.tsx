import { loadImages } from '../../../../utils/common/loadImages';

const images = loadImages('mypageButton');

const GridData = [
  {
    id: 1,
    name: 'grid4',
    image: images['grid4'],
    imageClick: images['grid4Click'],
    viewMode: 'CARD',
  },
  {
    id: 2,
    name: 'grid2',
    image: images['grid2'],
    imageClick: images['grid2Click'],
    viewMode: 'LIST',
  },
];

export default GridData;
