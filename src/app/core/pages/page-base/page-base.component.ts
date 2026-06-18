import {ActivatedRoute} from '@angular/router';
import {Directive, OnInit} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {ApiService} from '../../../services/api.service';
import {FormDialogService} from '../../../services/form-dialog.service';

@Directive()
export abstract class PageBaseComponent implements OnInit {
  gridId: string = GridConstants.NOT_APPLICABLE;
  params: Record<string, string> = {};
  pk = '';
  componentLoaded = false;
  selectedTabIndexes: { [key: string]: number } = {};


  protected constructor(
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(params => {
    //   if (this.pk) {
    //     // this.loadUser(this.pk);
    //   }
    // });

    this.route.queryParams.subscribe(queryParams => {
      const {gridId, ...params} = queryParams;
      this.gridId = queryParams['gridId'] ?? GridConstants.NOT_APPLICABLE;
      this.pk = queryParams['pk'] ?? '';

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

}
