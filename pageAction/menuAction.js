import { MenuObject } from '../pageObject/menuObject';
import { expect } from '@playwright/test';

export class MenuAction {
  constructor(page) {
    this.page = page;
    this.menu = new MenuObject(page);
  }

  async openMenu() {
    await this.menu.menuButton.click();
    // Menu item visible houya mane holo menu animation sesh
    await this.menu.logout.waitFor({ state: 'visible' });
  }

  async resetAppState() {
    await this.openMenu();
    
    // SauceDemo side menu-te 'Element is outside of the viewport' error thik korar 
    // shobcheye effective industry way holo dispatchEvent use kora (jodi animation thake)
    await this.menu.resetAppState.dispatchEvent('click');
    
    // Close button locator
    const closeButton = this.page.locator('#react-burger-cross-btn');
    await closeButton.click();
    
    // Wait kora jate menu-ta purapuri bondho hoye jay
    await this.menu.menuButton.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.openMenu();
    // DispatchEvent use korle viewport-er error ashbe na
    await this.menu.logout.dispatchEvent('click');
  }
}