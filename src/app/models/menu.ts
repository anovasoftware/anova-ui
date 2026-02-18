export interface PageItem {
  pageId: string;
  description: string;
}

export interface MenuItem {
  menuId: string;
  typeId: string;
  description: string;
  title: string;
  subTitle?: string;
  breadcrumbName: string;
  route: string;
  page?: PageItem;
}
