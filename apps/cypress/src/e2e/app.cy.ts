import { getPageTitle } from '../support/app.po';

const EXPECTED_TITLE = /Award-winning development studio based in Tri-Cities Washington/;

describe('home-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('SHOULD display the page title', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getPageTitle().contains(EXPECTED_TITLE);
  });
});
