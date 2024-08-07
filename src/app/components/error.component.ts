import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'youtube-error',
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-icon>error_outline</mat-icon>
        <span>{{errorTitle || 'Error Occured!'}}</span>
        <button (click)="reload.emit()" mat-raised-button color="warn">Try Again</button>
      </div>
    `,
    styles: [``]
})

export class errorComponent{
    @Output() reload = new EventEmitter;
    @Input() errorTitle = '';

    constructor(){
    }
}