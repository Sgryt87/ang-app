import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
    selector: '[validateLocation]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: LocationValidatorDirective,
        multi: true
    }]
})
export class LocationValidatorDirective implements Validator {
    validate(formGroup: FormGroup): ValidationErrors | null {
        const addressControll: AbstractControl = formGroup.controls['address'];
        const cityControll: AbstractControl = formGroup.controls['city'];
        const countryControll: AbstractControl = formGroup.controls['country'];
        const onlineUrlControll: AbstractControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if ((addressControll && addressControll.value &&
            cityControll && cityControll.value &&
            countryControll && countryControll.value)
            || (onlineUrlControll && onlineUrlControll.value)) {
            return null;
        } else {
            return {validateLocation: false};
        }

    }

}
