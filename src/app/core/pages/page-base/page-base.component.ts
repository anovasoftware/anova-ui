import { ActivatedRoute } from '@angular/router';
import {Directive, OnInit} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';

@Directive()
export abstract class PageBaseComponent implements OnInit {
  gridId: string = GridConstants.NOT_APPLICABLE;
  params: Record<string, string> = {};

  protected constructor(
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.gridId = queryParams['gridId'] ?? GridConstants.NOT_APPLICABLE;

      // this.params = { ...queryParams };

      const { gridId, ...params } = queryParams;
      this.params = params;
      this.onParamsLoaded();
    });
  }

  protected onParamsLoaded(): void {
    // optional override
  }
}
