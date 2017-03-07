import { DeviceManager2.0Page } from './app.po';

describe('device-manager2.0 App', () => {
  let page: DeviceManager2.0Page;

  beforeEach(() => {
    page = new DeviceManager2.0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
