import { Component, forwardRef, Input, ElementRef, ViewChild, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseInlineEditorComponent } from "./base-inline-editor.component";


@Component({
    selector: 'richtext-inline-editor',
    templateUrl: 'richtext-inline-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RichTextInlineEditorComponent),
            multi: true
        }
    ]
})

export class RichTextInlineEditorComponent extends BaseInlineEditorComponent {

    private _value = "";
    @Input('OnlyNumber') OnlyNumber: boolean = false;
    @Input("readOnly") readOnly: boolean = false;
    @ViewChild("richTextPopoverToolTip") richTextPopoverToolTip:any;
    @ViewChild("richTextPopover") richTextPopover:any;

    ngxEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        imageEndPoint: '',
        toolbar: [
            ['bold', 'italic', 'underline', 'fontSize']
        ]
    };

    constructor(elRef: ElementRef,
        private _renderer: Renderer2) {
        super(elRef, _renderer);
    }

    protected isItCanClose(): boolean {
        return true;
    }

    protected isNotPartOfMine(event: any) {
        let cdkOverlayContainer = document.getElementsByTagName("popover-container")[0];
        if (cdkOverlayContainer && event.target) {
            return !(cdkOverlayContainer.contains(event.target));
        }
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
    @Input() set value(val) {
        this._value = val;

        const normalizedValue = val === null ? '' : val;
        
        this._renderer.setProperty(this.richTextPopoverToolTip.nativeElement, 'innerHTML', normalizedValue);

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
        this.richTextPopover.hide();
        this.edit = true;
    }

    onValueChange(event: any) {
        this.close();
        this.value = event.target.value;
        this.dispatchEvent("valueChange", event.target.value);
    }

    getValue(value: any) {
        return this.getLabel(value);
    }

    getLabel(value: string) {
        let val = this.richTextPopoverToolTip.nativeElement.innerText;
        if (val && val.trim() != "") {
            if (val.length > 15) {
                return val.substr(0, 13) + "...";
            }
            else {
                return val;
            }
        }
        else {
            return "Enter Text";
        }
    }
}
