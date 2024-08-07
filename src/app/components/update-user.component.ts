import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { YoutubeRepository } from "../services/youtube-repository";


@Component({
    selector: 'youtube-update-user',
    template: `
        <form [formGroup]="userForm" (ngSubmit)="this.userForm.valid && this.addOrUpdateUser()">
        <div fxLayout="column" fxLayoutGap="0px" fxLayoutAlign="center stretch">
            <mat-form-field>
                <input formControlName="email" matInput placeholder="Email"/>
                <mat-error>Valid email is required</mat-error>
            </mat-form-field>
            <mat-form-field>
                <input formControlName="name" matInput placeholder="Username"/>
                <mat-error>Name is required</mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit">{{this.data ? 'Update' : 'Add'}}</button>
        </div>
    </form>

    `,
    styles: [`
        mat-form-field{
            margin: 10px;
        }
    `]
})

export class updateUserComponent implements OnInit{
    userForm! : FormGroup;

    constructor(
        private dialogRef: MatDialogRef<updateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private youtubeRepo: YoutubeRepository
    ){}

    ngOnInit(): void {
        this.userForm = new FormGroup({
            name: new FormControl(this.data ? this.data.name : null, [Validators.required]),
            email: new FormControl(this.data ? this.data.email : null, [Validators.required]),
        });
    }

    addOrUpdateUser(){
        if(this.data){
            this.updateUser();
        } else{
            this.addUser();
        }
    }

    updateUser(){
        const updatedUser = {...this.data,...this.userForm.value};
        console.log('updateUser: updatedUser: ', updatedUser);
        
        this.youtubeRepo.updateUser(updatedUser);
        this.dialogRef.close();
    }

    addUser(){
        this.youtubeRepo.addUser(this.userForm.value);
        this.dialogRef.close();
    }
}