import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseInlineEditorComponent } from "./base-inline-editor.component";

@Component({
    selector: 'text-inline-editor',
    templateUrl: 'text-inline-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInlineEditorComponent),
            multi: true
        }
    ]
})

export class TextInlineEditorComponent extends BaseInlineEditorComponent {

    @Input('value') _value: any = "";
    @Input('onlyNumber') onlyNumber: boolean = false;
    @Input('isZeroAllowed') isZeroAllowed: boolean = true;
    @Input("readOnly") readOnly: boolean = false;
    @Input("tableInline") tableInline: boolean = false;
    @Input() underline: string = '______________';
    @Input() alwaysOpen: boolean = false;

    @ViewChild("inputEle") inputEle?: ElementRef;
    @ViewChild("inputEle2") inputEle2?: ElementRef;

    constructor(elRef: ElementRef, 
        renderer: Renderer2,
        private _cdRef: ChangeDetectorRef) {
        super(elRef, renderer);
    }

    public ngDoCheck() {
        this._cdRef.detectChanges();
    }

    protected isItCanClose(): boolean {
        return true;
    }

    protected close() {
        this.edit = false;
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    get value() {
        return this._value;
    }
    set value(val) {
        if (this._value != val) {
            if (!this.isZeroAllowed && !val && val != "0") {
                val = "";
            }
            this._value = val;
            this.onChange(val);
            this.onTouched();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    onClick() {
        this.edit = true;
    }

    onFocusIn(event: any) {
        if (this.tableInline) {
            this.edit = true;
            setTimeout(() => {
                if (this.inputEle)
                    this.inputEle.nativeElement.focus();
                if (this.inputEle2)
                    this.inputEle2.nativeElement.focus();
            }, 100);
        }
    }

    onFocusOut(event: any) {
        if (this.tableInline) {
            this.edit = false;
        }
    }

    onValueChange(event: any) {
        this.close();
        this.value = event.target.value;
        this.dispatchEvent("valueChange", event.target.value);
    }

    private getValue(value: any) {
        return this.getLabel(value);
    }

    getLabel(value: any) {
        this.value = value;
        if (!value && value != "0") {
            return this.readOnly ? '' : this.underline;
        }
        return value;
    }
}
