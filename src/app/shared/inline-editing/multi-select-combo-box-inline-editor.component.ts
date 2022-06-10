import { Component, forwardRef, Input, ElementRef, AfterViewChecked, ViewChild, ChangeDetectorRef, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseInlineEditorComponent } from "./base-inline-editor.component";


@Component({
    selector: 'multi-select-combo-box-inline-editor',
    templateUrl: 'multi-select-combo-box-inline-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComboBoxInlineEditorComponent),
            multi: true
        }
    ]
})

export class MultiSelectComboBoxInlineEditorComponent extends BaseInlineEditorComponent implements AfterViewChecked {

    @Input('value') _value = "";
    @Input("readOnly") readOnly: boolean = false;
    @Input("records") records: any[] = [];
    @Input("labelField") labelField: string = "";

    @ViewChild("selectControl") selectControl? : any;
    labels: any[] = [];
    optionsMap?: Map<string, string>;
    isEmpty: boolean = false;
    private initialCall: boolean = false;
    
    constructor(elRef: ElementRef, 
        renderer: Renderer2,
        private cdr: ChangeDetectorRef) {
        super(elRef, renderer);
    }

    ngAfterViewChecked() {
        if (this.initialCall) {
            if (this.selectControl) {
                this.selectControl.open();
                this.initialCall = false;
            }
        }
        this.cdr.detectChanges();
    }

    protected isItCanClose(): boolean {
        return true;
    }

    protected isNotPartOfMine(event: any) {
        let cdkOverlayContainer = document.getElementsByClassName("cdk-overlay-container")[0];
        if (cdkOverlayContainer && event.target) {
            return !(cdkOverlayContainer.contains(event.target) && !this.hasClass(event.target, "cdk-overlay-backdrop"));
        }
        return true;
    }

    protected close() {
        this.edit = false;
        this.initialCall = false;
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
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
        this.dispatchEvent("valueEdit", this.value);
        this.edit = true;
        this.initialCall = true;
    }

    private onValueChange(event: any) {
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
        this.dispatchEvent("valueChange", this.value);
    }

    private getValue(rec: any) {
        return this.getLabel(rec);
    }
    
    getLabel(selectedValues: any) {
        this.labels = [];
        let label: any = "";
        this.optionsMap = new Map<string, string>();
        for (var i = 0; i < this.records.length; i++) {
            this.optionsMap.set(this.records[i].id, this.records[i].itemName);
        }
        if (selectedValues != null && selectedValues.length > 0) {
            label = this.optionsMap.get(selectedValues[0]);
            if (selectedValues.length > 1) {
                label += " +" + (selectedValues.length - 1) + " Others";
            }
        } else {
            label = "Select";
        }

        if (selectedValues != null && selectedValues.length > 0) {
            for (let i = 0; i < selectedValues.length; i++) {
                this.labels.push(this.optionsMap.get(selectedValues[i]));
            }
        }
        
        return label;
    }
    
    isEmptyCheck(selectedValues: any) {
        this.optionsMap = new Map<string, string>();
        for (var i = 0; i < this.records.length; i++) {
            this.optionsMap.set(this.records[i].id, this.records[i].itemName);
        }
        if (selectedValues != null && selectedValues.length > 0) {
            if (selectedValues.length > 1) {
                this.isEmpty = false;
            }
        } else {
            this.isEmpty = true;
        }
    }
}
