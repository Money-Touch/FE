import type { Post } from '../../types/feed/feed';

export const Posts: Post[] = [
  {
    id: 1,
    author: { name: '라인', profileImage: '' },
    image: '',
    likes: 1,
    dislikes: 10,
    timestamp: new Date(),
    category: '배달/외식',
    companyName: '신라방마라탕',
    price: 12000,
    content:
      '오늘 저녁은 기필코 집밥을 해먹으려고 했는데...\n남자친구랑 헤어져서 슬퍼서 마라탕 먹었습니다.',
    comments: [
      {
        id: 1,
        author: { name: '영이', profileImage: '' },
        content: '네? 헤어진거랑 마라탕이 무슨 상관이죠?',
        timestamp: new Date(),
        replies: [
          {
            id: 2,
            author: { name: '라인', profileImage: '' },
            content: '헤어졌으니 봐주세요ㅜ 다음부턴 무조건 집밥입니다..',
            timestamp: new Date(),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: { name: '영이', profileImage: '' },
    image: '',
    likes: 5,
    dislikes: 0,
    timestamp: new Date(),
    category: '카페/디저트',
    companyName: '브레드05',
    price: 8500,
    content:
      '날씨가 좋아서 빵 사러 다녀왔어요\n소금빵이 진짜 맛있었어요!! 추천!!',
    comments: [],
  },
  {
    id: 3,
    author: { name: '성우', profileImage: '' },
    image: '',
    likes: 0,
    dislikes: 2,
    timestamp: new Date(),
    category: '편의점/마트',
    companyName: 'CU 편의점',
    price: 2100,
    content:
      '오늘도 도시락으로 한 끼 해결... 새로운 메뉴 나왔던데 먹어본 사람?',
    comments: [
      {
        id: 3,
        author: { name: '홍길동', profileImage: '' },
        content: '신제품 괜찮던데요! 고기 쪽이 더 맛있어요.',
        timestamp: new Date(),
        replies: [],
      },
    ],
  },
];
