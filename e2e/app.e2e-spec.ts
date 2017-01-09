import { NevibivaliciPage } from './app.po';

describe('nevibivalici App', function() {
  let page: NevibivaliciPage;

  beforeEach(() => {
    page = new NevibivaliciPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
