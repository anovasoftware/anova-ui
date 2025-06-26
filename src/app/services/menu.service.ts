import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

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

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menusSubject = new BehaviorSubject<MenuItem[]>([]);
  menus$ = this.menusSubject.asObservable();

  constructor(private api: ApiService) {}

  loadMenus(): void {
    this.api.get('public/table/static/menu/').subscribe({
      next: (res) => this.menusSubject.next(res?.detail || []),
      error: () => this.menusSubject.next([]),
    });
  }
  getMenusByType(typeId: string): MenuItem[] {
    return this.menusSubject.getValue().filter(m => m.typeId === typeId);
  }
  getMenuById(menuId: string): MenuItem | null {
    return this.menusSubject.getValue().find(m => m.menuId === menuId) ?? null;
  }

  // loadMenu(typeId: string = '', menuId: string = ''): void {
  //   const params: any = {};
  //   if (typeId) params.typeId = typeId;
  //   if (menuId) params.menuId = menuId;
  //
  //   this.api.get('public/table/static/menu/', params).subscribe({
  //     next: (res) => {
  //       const menuItems = res?.detail || [];
  //       this.menuListSubject.next(menuItems);
  //     },
  //     error: () => {
  //       this.menuListSubject.next([]);
  //     }
  //   });
  // }

  // getMenuList(): MenuItem[] {
  //   return this.menusSubject.getValue();
  // }
  //
  // getMenu(menuId: string): void {
  //   const currentMenu = this.menusSubject.getValue();
  //   const alreadyLoaded = currentMenu.length > 0 && currentMenu[0].menuId === menuId;
  //
  //   if (!alreadyLoaded) {
  //     this.loadMenu('', menuId);  // Load just this one menu
  //   }
  // }
  //
  // getSingleMenu(): MenuItem | null {
  //   const list = this.getMenuList();
  //   return list.length > 0 ? list[0] : null;
  // }
  //
  // getMenuItemByRoute(route: string): MenuItem | undefined {
  //   return this.getMenuList().find(item => item.route === route);
  // }
}

// // src/app/services/menu.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { ApiService } from './api.service';
//
// export interface MenuItem {
//   menuId: string;
//   description: string;
//   title: string;
//   subTitle?: string;
//   breadcrumbName: string;
//   route: string;
// }
//
// @Injectable({ providedIn: 'root' })
// export class MenuService {
//   private headerMenuSubject = new BehaviorSubject<MenuItem[]>([]);
//   headerMenu$ = this.headerMenuSubject.asObservable();
//
//   constructor(private api: ApiService) {}
//
//   loadMenu(typeId: string = ''): void {
//     this.api.get('public/table/static/menu/', { typeId }).subscribe({
//       next: (res) => {
//         const menuItems = res?.detail || [];
//         // console.log(menuItems);
//         this.headerMenuSubject.next(menuItems);
//       },
//       error: () => {
//         this.headerMenuSubject.next([]); // fallback to empty
//       }
//     });
//   }
//
//   getMenuItemByRoute(route: string): MenuItem | undefined {
//     return this.headerMenuSubject.getValue().find(item => item.route === route);
//   }
// }
