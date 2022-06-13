import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepoContentComponent } from './view-repo-content.component';

describe('ViewRepoContentComponent', () => {
  let component: ViewRepoContentComponent;
  let fixture: ComponentFixture<ViewRepoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRepoContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRepoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
