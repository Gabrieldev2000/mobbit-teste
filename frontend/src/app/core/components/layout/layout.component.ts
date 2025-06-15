import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="layout">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <div class="sidenav-header">
            <span class="title">Mobbit</span>
          </div>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              Dashboard
            </a>
            <a mat-list-item routerLink="/faturas" routerLinkActive="active">
              Faturas
            </a>
            <a mat-list-item routerLink="/contratos" routerLinkActive="active">
              Contratos
            </a>
            <a mat-list-item routerLink="/operadoras" routerLinkActive="active">
              Operadoras
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="sidenav-content">
          <button mat-icon-button class="menu-button" (click)="toggleMenu()">
            <mat-icon>{{sidenav.opened ? 'menu_open' : 'menu'}}</mat-icon>
          </button>
          <ng-content></ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .layout {
      height: 100vh;
      display: flex;
    }

    .sidenav-container {
      flex: 1;
      height: 100%;
    }

    .menu-button {
      position: fixed;
      top: 16px;
      left: 16px;
      z-index: 1000;
      background-color: #1a237e;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background-color: #0d1642;
        transform: scale(1.05);
      }

      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .sidenav {
      width: 250px;
      background-color: #1a237e;
      color: white;
      transition: width 0.3s ease;

      &.mat-drawer-side {
        border-right: none;
      }
    }

    .sidenav-header {
      padding: 16px;
      display: flex;
      align-items: center;
      background-color: #0d1642;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .title {
        font-size: 20px;
        font-weight: 500;
        color: white;
      }
    }

    mat-nav-list {
      padding-top: 8px;

      a {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        height: 48px;
        margin: 4px 8px;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
      }
    }

    .sidenav-content {
      background-color: #f5f5f5;
      padding-top: 60px;
    }
  `]
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMenu() {
    this.sidenav.toggle();
  }
}
