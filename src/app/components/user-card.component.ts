import { Component, Input } from "@angular/core";
import { User } from "../models/user";
import { YoutubeRepository } from "../services/youtube-repository";
import { MatDialog } from "@angular/material/dialog";
import { updateUserComponent } from "./update-user.component";

@Component({
    selector: 'youtube-user-card',
    template: `
        <mat-card style="margin-top: 10px; margin-bottom: 10px" fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="start stretch">
            <mat-card-title style="padding: 10px;">{{this.user.name}}</mat-card-title>
            <mat-card-content>{{this.user.email}}</mat-card-content>
            <div fxLayout="row" fxLayoutGap="5px" fxLayoutAlign="center stretch">
                <button (click)="delete()" mat-raised-button color="warn">Delete</button>
                <button (click)="update()" mat-raised-button color="primary">Update</button>
            </div>
        </mat-card>
    `,
    styles: ['']
})

export class UserCardComponent{

    @Input() user!: User;

    constructor(
        private youtubeRepository: YoutubeRepository,
        private dialog: MatDialog
        ){}

    delete(){
        this.youtubeRepository.deleteUser(this.user.id)
    }

    update(){
        this.dialog.open(updateUserComponent,{
            width: '256px',
            data: this.user
        })
    }
}