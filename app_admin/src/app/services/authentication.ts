import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { AnimalData } from './animal-data';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  // setup storage and service access
  constructor(
    @Inject (BROWSER_STORAGE) private storage: Storage,
    private animalDataService: AnimalData
  ) {}

  // variable handles authentication responses
  authResp: AuthResponse = new AuthResponse();

  // get token from storage provider
  // key name for token is 'grazioso-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('grazioso-token');

    // return a string even if no token
    if(!out)
    {
      return '';
    }
      return out;
    }

  // save token to storage provider.
  // key name for token is 'grazioso-token'
  public saveToken(token: string): void {
    this.storage.setItem('grazioso-token', token);
  }

  // logout of application and remove the JWT from storage
  public logout(): void {
    this.storage.removeItem('grazioso-token');
  }

  // boolean to determine if logged in and the token is
  // still valid. Even if token is present will still have to
  // reauthenticate if the token has expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }
  // retrieve the current user. This function should only be called
  // after the calling method has checked to make sure that the user
  // isLoggedIn.
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }




  
  // login method that leverages the login method in tripData
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information.
  public login(user: User, passwd: string) : void {
    this.animalDataService.login(user,passwd)
      .subscribe({
        next: (value: any) => {
          if(value)
          {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
  // register method that leverages the register method in
  // tripDataService

  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information. Please Note: This method is nearly identical to the
  // login method because the behavior of the API logs a new user in
  // immediately upon registration
  public register(user: User, passwd: string) : void {
    this.animalDataService.register(user,passwd)
      .subscribe({
        next: (value: any) => {
          if(value){
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
