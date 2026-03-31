import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/api-response';
import {Grid} from '../models/grid';
import {TypeConstants} from '../../constants/type_constants';
import {GridConstants} from '../../constants/grid_constants';

@Injectable({providedIn: 'root'})
export class GridService {
  protected readonly TypeConstants = TypeConstants;

  private gridSubject = new BehaviorSubject<Grid | null>(null);
  grid$ = this.gridSubject.asObservable();

  private loaded = false;
  private loading = false;
  private gridId = GridConstants.TO_BE_ANNOUNCED;

  constructor(private api: ApiService) {
  }

  loadGrid(gridId: string, forceRefresh = false): void {
    this.gridId = gridId;
    if ((this.loaded || this.loading) && !forceRefresh) {
      return;
    }

    this.loading = true;

    this.api.get<ApiResponse<{ grid: Grid }>>(
      `grid/grid${this.gridId}`
    ).
    subscribe({
      next: (response) => {
        const grid = response?.data?.grid || null;
        // const grid = data?.grid;
        console.log('Grid data:', grid);
        this.gridSubject.next(grid);

        this.loaded = !!grid;
        this.loading = false;
      },
      error: () => {
        this.gridSubject.next(null);
        this.loaded = false;
        this.loading = false;
      }
    });
  }
}
