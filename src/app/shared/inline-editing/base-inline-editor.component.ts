import { Component, ElementRef, Directive, Renderer2, OnDestroy } from "@angular/core";

@Directive()
export abstract class BaseInlineEditorComponent implements OnDestroy {

    _edit: boolean = false;
    get edit(): boolean {
        return this._edit;
    }
    set edit(val: boolean) {
        //Before ON the edit status expected to add Event listener for document click.
        if(val) {
            this.createDocClickListener();
        }
        this._edit = val;
        //After OFF the edit status expected to delete/close Event listener for document click.
        if(!val) {
            this.removeDocClickListener();
        }
    }

    private clickListener?: any;

    constructor(private elRef: ElementRef,
        private renderer: Renderer2) {
            
    }

    createDocClickListener() {
        this.clickListener = this.renderer.listen("document", "click", event => {
            if (!this.elRef.nativeElement.contains(event.target)) {
                if (this.isItCanClose() && !this.isHidden(event.target) && this.isNotPartOfMine(event)) {
                    // this.close();
                }
            }
        });
    }

    removeDocClickListener() {
        if(this.clickListener) {
            this.clickListener();
        }
    }

    protected abstract isItCanClose(): boolean;
    // protected abstract close();
    protected isNotPartOfMine(event: any) {
        return true;
    }

    private isHidden(el: any) {
        return (el.offsetParent === null)
    }

    protected hasClass(element: any, cls: any) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    protected dispatchEvent(dispatchEventType: string, val: any) {
        var cusEvent = new CustomEvent(dispatchEventType, {
            detail: { value: val },
            bubbles: true,
            cancelable: false
        });
        this.elRef.nativeElement.dispatchEvent(cusEvent);
    }

    ngOnDestroy() {
        this.removeDocClickListener();
    }
}
