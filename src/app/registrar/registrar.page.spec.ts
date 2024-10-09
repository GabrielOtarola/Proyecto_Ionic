import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarPage } from './registrar.page';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule, // Importamos el módulo de pruebas para el router
        FormsModule,
        ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the registrar page', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with the necessary fields', () => {
    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector('ion-input[name="username"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="email"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="password"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="confirmPassword"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="age"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="height"]')).not.toBeNull();
    expect(compiled.querySelector('ion-input[name="weight"]')).not.toBeNull();
    expect(compiled.querySelector('ion-select[name="gender"]')).not.toBeNull();
    expect(compiled.querySelector('ion-select[name="activityLevel"]')).not.toBeNull();
  });

  it('should validate that password and confirmPassword match', () => {
    component.ngAfterViewInit();

    const compiled = fixture.debugElement.nativeElement;
    const passwordInput = compiled.querySelector('ion-input[name="password"]');
    const confirmPasswordInput = compiled.querySelector('ion-input[name="confirmPassword"]');

    passwordInput.value = 'TestPass123';
    confirmPasswordInput.value = 'TestPass123';

    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Simular que no hay errores de coincidencia
    expect(compiled.querySelector('#confirmPasswordError').textContent).toBe('');
  });

  it('should display an error if passwords do not match', () => {
    component.ngAfterViewInit();

    const compiled = fixture.debugElement.nativeElement;
    const passwordInput = compiled.querySelector('ion-input[name="password"]');
    const confirmPasswordInput = compiled.querySelector('ion-input[name="confirmPassword"]');

    passwordInput.value = 'TestPass123';
    confirmPasswordInput.value = 'AnotherPass456';

    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Simular el error cuando las contraseñas no coinciden
    expect(compiled.querySelector('#confirmPasswordError').textContent).toContain('Las contraseñas no coinciden.');
  });

  // Puedes seguir agregando más pruebas según sea necesario
});

