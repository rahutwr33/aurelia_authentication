import { User } from './../model/usermodel';

export class SharedState {
  currentUser
  isAuthenticated
  constructor() {
    this.currentUser = new User();
    this.isAuthenticated = false;
  }
}
