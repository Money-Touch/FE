import { loadImages } from '../../../utils/common/loadImages';

const images = loadImages('result');

const ResultData = [
  {
    id: 1,
    code: 'PTG',
    title: '계획 철벽러',
    explain:
      '철저한 계획 아래 소비하며 비교, 계획, 분석!\n돈 쓸 줄 아는 똑똑한 절약러에요.',
    image: images['PTG'],
    imageShadow: images['PTGshadow'],
    background: 'linear-gradient(180deg, #FFC058 0%, #FFFFFF 100%)',
  },
  {
    id: 2,
    code: 'PTE',
    title: '현실주의 낙천가',
    explain:
      '계획적이고 절약적이지만\n기분파 소비 성향이 약간 있는 현실타협형이에요.',
    image: images['PTE'],
    imageShadow: images['PTEshadow'],
    background: 'linear-gradient(180deg, #A3C3FF 0%, #FFFFFF 100%)',
  },
  {
    id: 3,
    code: 'PFG',
    title: '감성 속 알뜰러',
    explain:
      '예산 안에서 내가 원하는 것을\n합리적으로 누릴 줄 아는 감성 절약파에요.',
    image: images['PFG'],
    imageShadow: images['PFGshadow'],
    background: 'linear-gradient(180deg, #E4C28B 0%, #FFFFFF 100%)',
  },
  {
    id: 4,
    code: 'PFE',
    title: '기분파 철벽러',
    explain:
      '지출에 기준이 있어 잘 절약하다가도,\n순간의 즐거움을 추구하는 기분파 절약러에요.',
    image: images['PFE'],
    imageShadow: images['PFEshadow'],
    background: 'linear-gradient(180deg, #BEF4C7 0%, #FFFFFF 100%)',
  },
  {
    id: 5,
    code: 'STG',
    title: '충동 억제러',
    explain:
      '즉흥적인 소비 욕구가 크지만\n소비 계획을 지키기 위해 노력하는 유형이에요.',
    image: images['STG'],
    imageShadow: images['STGshadow'],
    background: 'linear-gradient(180deg, #FFA1C8 0%, #FFFFFF 100%)',
  },
  {
    id: 6,
    code: 'STE',
    title: '롤러코스터형 소비자',
    explain:
      '스트레스를 받으면 참지 못하고 지르지만\n다음 날 반성하고 후회하는 변덕쟁이에요.',
    image: images['STE'],
    imageShadow: images['STEshadow'],
    background: 'linear-gradient(180deg, #FF5E5E 0%, #FFFFFF 100%)',
  },
  {
    id: 7,
    code: 'SFG',
    title: '자유로운 전략가',
    explain:
      '돈 쓸 때는 확실히 쓰는 감정적 소비자지만\n나름의 기준을 찾기 위해 노력하는 유형이에요.',
    image: images['SFG'],
    imageShadow: images['SFGshadow'],
    background: 'linear-gradient(180deg, #FFD119 0%, #FFFFFF 100%)',
  },
  {
    id: 8,
    code: 'SFE',
    title: '감정소비 만렙러',
    explain:
      '계획? 예산? 그런 거 없어!\n소비를 통해 자유를 느끼는 flex 만렙러!',
    image: images['SFE'],
    imageShadow: images['SFEshadow'],
    background: 'linear-gradient(180deg, #9987A7 0%, #FFFFFF 100%)',
  },
];

export default ResultData;
