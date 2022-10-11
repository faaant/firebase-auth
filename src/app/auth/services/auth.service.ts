import { Injectable, OnDestroy } from '@angular/core';
import { User } from 'src/app/interfaces/User.interface'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDialogComponent } from '@shared/components/pop-up-dialog/pop-up-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private userData: User|null = null;
  private destroy$: Subject<boolean> = new Subject()
  constructor(
    public angularFirestore: AngularFirestore, 
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private dialog: MatDialog,
  ) {
    this.angularFireAuth.authState.pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  
  signIn(user: User) {
    if(!user?.password) {
      return;
    }
    return this.angularFireAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.setUserData(result.user);
        this.angularFireAuth.authState.pipe(
          takeUntil(this.destroy$)
        ).subscribe((user) => {
          if (user) {
            this.router.navigate(['main']);
          }
        });
      })
      .catch((error) => {
        this.dialog.open(PopUpDialogComponent,{
          data: error.message,
          panelClass: "dialog"
        })
      });
  }

  signUp(user : User) {
    if(!user?.password) {
      return;
    }
    return this.angularFireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.setUserData(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['main']);
          }
        });
      })
      .catch((error) => {
        this.dialog.open(PopUpDialogComponent,{
          data: error.message,
          panelClass: "dialog"
        })
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth','sign-in']);
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  ngOnDestroy(): void {
    this.destroy$.next(false)
    this.destroy$.complete()
  }
}