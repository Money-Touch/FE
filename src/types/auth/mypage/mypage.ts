export interface MenuItem {
  id: number;
  name: string;
}

export interface MenuButton extends MenuItem {
  image: string;
  link: string;
}

export interface MenuSection {
  id: number;
  title: string;
  list: MenuItem[];
}

export interface MypageResponse {
  result: {
    nickname: string;
    profileImgUrl: string;
    representativeBadgeImageUrl: string;
  };
}
