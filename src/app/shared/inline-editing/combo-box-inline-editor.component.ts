import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BaseInlineEditorComponent } from './base-inline-editor.component';


@Component({
    selector: 'combo-box-inline-editor',
    templateUrl: 'combo-box-inline-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboBoxInlineEditorComponent),
            multi: true
        }
    ],
    styleUrls: [
        'combo-box-inline-editor.component.scss'
    ]
})

export class ComboBoxInlineEditorComponent extends BaseInlineEditorComponent {

    private _value: any = "";
    get value() {
        return this._value;
    }
    @Input() set value(val) {
        if (this._value != val) {
            this._value = val;
            this.onChange(val);
            this.onTouched();
            this.cdr.detectChanges();
            if (val) {
                this.defaultLabel = "";
            } else {
                this.initialValue = "";
            }
        }
    }
    @Input() readOnly: boolean = false;
    @Input() records: any[] = [];
    @Input() labelField: any = "";
    @Input() alwaysOpen: boolean = false;
    @Input() defaultLabel: any = "";
    @Input() required: boolean = false;

    @ViewChild("selectControl") selectControl?: MatSelect;

    initialValue: any = "";
    params: any;

    constructor(elRef: ElementRef,
        renderer: Renderer2,
        private cdr: ChangeDetectorRef) {
        super(elRef, renderer);
    }

    ngOnInit() {
        console.log("record",this.records);
        this.initialValue = this.getValue(this.value);
    }

    protected isItCanClose(): boolean {
        return true;
    }

    protected close() {
        this.edit = false;
    }

    onChange: any = () => { };
    onTouched: any = () => { };

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
        this.dispatchEvent("valueEdit", this.value);
        this.edit = true;
        setTimeout(() => {
            this.openDropdown();
        }, 10);
    }

    private openDropdown() {
        if (this.selectControl) {
            this.selectControl.open();
            this.selectControl.focus();
            this.cdr.detectChanges();
        }
    }

    onValueChange(event: any) {
        this.close();
        let selectedValue = event.value;
        let selectedItem = null;
        for (let rec of this.records) {
            let val = this.getValue(rec);
            if (val == selectedValue) {
                selectedItem = rec;
                break;
            }
        }
        this.value = selectedItem;
        this.cdr.detectChanges();
        this.dispatchEvent("valueChange", this.value);
    }

    getValue(rec: any) {
        return this.getLabel(rec);
    }

    getLabel(rec: any, elseStr: any = "") {
        let str = "";
        if (this.labelField && rec) {
            str = rec[this.labelField];
        }
        else {
            str = rec;
        }
        if (str) {
            if (elseStr == "Select") {
                this.initialValue = str;
            }
            return str;
        }
        else {
            if (elseStr == "Select") {
                this.initialValue = elseStr;
            }
            return elseStr;
        }

    }
}