// authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === 'admin') {
      localStorage.setItem('currentUser', JSON.stringify({ email: email, role: 'Admin' }));
      return true;
    } else if (email === 'operator@test.com' && password === 'operator') {
      localStorage.setItem('currentUser', JSON.stringify({ email: email, role: 'Operator' }));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    console.log("get going")
    // localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null; // or handle the absence of user in your application logic
    }
  }
}
