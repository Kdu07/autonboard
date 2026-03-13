import { ComponentFixture, TestBed } from '@angular/core/testing';


import { Upload } from './upload';


describe('Upload', () => {
  let component: Upload;
  let fixture: ComponentFixture<Upload>;


  beforeEach(async () => {
    // Prepare the testing module specifically for this component
    await TestBed.configureTestingModule({
      imports: [Upload],
    }).compileComponents();


    // Initialize the component and link it to the test fixture
    fixture = TestBed.createComponent(Upload);
    component = fixture.componentInstance;
    
    // Ensure all asynchronous activities and lifecycles are complete
    await fixture.whenStable();
  });


  it('should create', () => {
    // Verify the component instance was successfully initialized
    expect(component).toBeTruthy();
  });
});