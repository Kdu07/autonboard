import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponent } from './upload';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('UploadComponent', () => {

  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TESTE 1
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // TESTE 2
  it('should display selected file name', () => {
    component.arquivoSelecionado = 'teste.csv';
    fixture.detectChanges();

    const text = fixture.nativeElement
      .querySelector('.upload-title')
      .textContent;

    expect(text).toContain('teste.csv');
  });

  // TESTE 3
  it('should show default message when no file is selected', () => {
    component.arquivoSelecionado = '';
    fixture.detectChanges();

    const text = fixture.nativeElement
      .querySelector('.upload-title')
      .textContent;

    expect(text).toContain('Arraste e solte o arquivo aqui');
  });

  // TESTE 4
  it('should call onFileSelected when file input changes', () => {

    spyOn(component, 'onFileSelected');

    const input = fixture.debugElement.query(
      By.css('input[type="file"]')
    );

    input.triggerEventHandler('change', null);

    expect(component.onFileSelected).toHaveBeenCalled();
  });

  // TESTE 5
  it('should call fazerUpload when upload button is clicked', () => {

    spyOn(component, 'fazerUpload');

    const button = fixture.debugElement.query(
      By.css('.btn-upload')
    );

    button.triggerEventHandler('click', null);

    expect(component.fazerUpload).toHaveBeenCalled();
  });

  // TESTE 6
  it('should disable upload button when estaEnviando is true', () => {

    component.estaEnviando = true;
    fixture.detectChanges();

    const button = fixture.nativeElement
      .querySelector('.btn-upload');

    expect(button.disabled).toBeTrue();
  });

  // TESTE 7
  it('should update progress bar width based on progresso', () => {

    component.progresso = 50;
    fixture.detectChanges();

    const progressBar = fixture.nativeElement
      .querySelector('.progress-bar-preenchimento');

    expect(progressBar.style.width).toContain('50%');
  });

});