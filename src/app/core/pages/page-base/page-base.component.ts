import {ActivatedRoute} from '@angular/router';
import {Directive, inject, OnInit} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {ApiService} from '../../../services/api.service';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MenuConstants} from '../../../../constants/menu_constants';
import {PageConstants} from '../../../../constants/page_constants';
import {GlobalService} from '../../../services/global.service';
import {User} from '../../../models/user';

@Directive()
export abstract class PageBaseComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly globalService = inject(GlobalService);

  gridId: string = GridConstants.NOT_APPLICABLE;
  menuId: string = MenuConstants.NOT_APPLICABLE;

  params: Record<string, string> = {};
  pk = '';
  componentLoaded = false;

  selectedTabIndex = 0;
  protected tabIndexKey = '';

  protected constructor(
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const {gridId, ...params} = queryParams;
      this.gridId = queryParams['gridId'] ?? GridConstants.NOT_APPLICABLE;
      this.menuId = params['menuId'] || MenuConstants.NOT_APPLICABLE;
      this.pk = queryParams['pk'] ?? '';

      this.loadTabIndex();

      this.params = params;
      this.onParamsLoaded();
      this.componentLoaded = true;
    });
  }

  protected onParamsLoaded(): void {
    // optional override
  }

  protected loadRecord<T>(
    api: ApiService,
    url: string,
    assign: (record: T | null) => void
  ): void {
    api.get<any>(url).subscribe({
      next: response => {
        assign(response?.data?.record ?? null);
        this.componentLoaded = true;
      },
      error: error => {
        console.error(`Error loading record from ${url}`, error);
        this.componentLoaded = true;
      }
    });
  }

  protected launchForm(
    formDialog: FormDialogService,
    formId: string,
    recordId: string,
    action: string,
    params = {}
  ): void {
    const dialogRef = formDialog.openForm(
      formId,
      recordId,
      action,
      params
    );

    dialogRef.afterClosed().subscribe(result => {
      this.onFormClosed(result);
    });
  }

  protected onFormClosed(result: any): void {
    // optional override
  }

  protected loadTabIndex(): void {
    if (this.tabIndexKey) {
      const value = sessionStorage.getItem(this.tabIndexKey);
      this.selectedTabIndex = value ? Number(value) : 0;
    }
  }

  protected saveTabIndex(index: number): void {
    this.selectedTabIndex = index;
    if (this.tabIndexKey) {
      sessionStorage.setItem(this.tabIndexKey, index.toString());
    }
  }
  protected get user(): User | null {
    return this.globalService?.currentUser;
  }
  protected get hotelId(): string {
    return this.globalService.currentHotelId;
  }
  protected get clientId(): string {
    return <string>this.globalService.currentClient?.clientId;
  }
  protected get clientExtensionId(): string {
    return <string>this.globalService.currentClient?.clientExtension?.clientExtensionId;
  }

}
