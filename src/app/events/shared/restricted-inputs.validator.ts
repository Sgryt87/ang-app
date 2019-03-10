// TODO: move to utils
import {FormControl} from '@angular/forms';

export class RestrictedInputsValidator {
    private static invalidWords: string[];

    // TODO: validation missess words
    static restrictedInput(words: string[]): any {
        return (control: FormControl): { [key: string]: any } => {
            if (!words) {
                return null;
            }
            this.invalidWords = words.map(w =>
                control.value.includes(w) ? w : null)
                .filter(w => w != null);

            return control.value.includes('foo') ?
                {'restrictedInput': this.invalidWords.join(', ')} :
                null;
        };
    }
}
