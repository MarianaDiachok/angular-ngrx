import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    public messagesService: MessagesService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  onActivate($event: any, routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet) {
  }

}
