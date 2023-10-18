import { MenuItem } from 'primeng/api';
import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsService', () => {
  let service: BreadcrumbsService;

  beforeEach(() => {
    service = new BreadcrumbsService();
  });

  it('should set and retrieve the breadcrumb data', () => {
    const home = { icon: 'pi pi-home', label: 'Home' };
    const items = [
      { icon: 'pi pi-folder', label: 'Category 1' },
      { icon: 'pi pi-file', label: 'File 1' },
    ];

    service.data = { home, items };

    expect(service.home).toEqual(home);
    expect(service.items).toEqual(items);
  });

  it('should return the default breadcrumb data if not set', () => {
    const defaultHome = { icon: 'pi pi-home mr-2', label: 'Home' };
    const defaultItems: MenuItem[] = [];

    expect(service.home).toEqual(defaultHome);
    expect(service.items).toEqual(defaultItems);
  });
});
