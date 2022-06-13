import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepoFileComponent } from './view-repo-file.component';

describe('ViewRepoFileComponent', () => {
  let component: ViewRepoFileComponent;
  let fixture: ComponentFixture<ViewRepoFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRepoFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRepoFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
