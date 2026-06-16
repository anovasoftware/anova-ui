import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/api-response';
import {Grid} from '../models/grid';
import {TypeConstants} from '../../constants/type_constants';
import {GridConstants} from '../../constants/grid_constants';
import {HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GridService {
  private gridSubject = new BehaviorSubject<Grid | null>(null);
  grid$ = this.gridSubject.asObservable();

  private loadedGridId: string | null = null;
  private loadingGridId: string | null = null;

  constructor(private api: ApiService) {
  }

  loadGrid(gridId: string, forceRefresh = false, params: Record<string, any> = {}): void {
    if (!forceRefresh && (this.loadedGridId === gridId || this.loadingGridId === gridId)) {
      return;
    }

    this.loadingGridId = gridId;
    this.gridSubject.next(null);

    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    this.api.get<ApiResponse<{ grid: Grid }>>(
      `grid/grid${gridId}`,
      httpParams
    )
      .subscribe({
        next: (response) => {
          const grid = response?.data?.grid || null;
          this.gridSubject.next(grid);
          this.loadedGridId = grid ? gridId : null;
          this.loadingGridId = null;
        },
        error: () => {
          this.gridSubject.next(null);
          this.loadedGridId = null;
          this.loadingGridId = null;
        }
      });
  }

  // loadGrid(gridId: string, forceRefresh = false, params: Record<string, any> = {}): void {
  //   if (
  //     !forceRefresh &&
  //     (this.loadedGridId === gridId || this.loadingGridId === gridId)
  //   ) {
  //     return;
  //   }
  //
  //   this.loadingGridId = gridId;
  //   this.gridSubject.next(null);
  //
  //   this.api.get<ApiResponse<{ grid: Grid }>>(`grid/grid${gridId}`)
  //     .subscribe({
  //       next: (response) => {
  //         const grid = response?.data?.grid || null;
  //         this.gridSubject.next(grid);
  //         this.loadedGridId = grid ? gridId : null;
  //         this.loadingGridId = null;
  //       },
  //       error: () => {
  //         this.gridSubject.next(null);
  //         this.loadedGridId = null;
  //         this.loadingGridId = null;
  //       }
  //     });
  // }
}
