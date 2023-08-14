import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface IData {
  home: MenuItem;
  items: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private _home: MenuItem = { icon: 'pi pi-home mr-2', label: 'Home' };
  private _items: MenuItem[] = [];

  set data(value: IData) {
    this._home = { ...this._home, ...(value.home || {}) };
    this._items = [...(value.items || [])];
  }

  get home(): MenuItem {
    return this._home;
  }

  get items(): MenuItem[] {
    return this._items;
  }
}
