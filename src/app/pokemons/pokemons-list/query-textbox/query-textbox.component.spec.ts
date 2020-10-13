import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTextboxComponent } from './query-textbox.component';

describe('QueryTextboxComponent', () => {
  let component: QueryTextboxComponent;
  let fixture: ComponentFixture<QueryTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryTextboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
