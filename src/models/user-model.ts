import { UserType } from '../types';

class User {
  email: string;
  userName: string;

  constructor(public userProfile: UserType) {
    this.email = userProfile.email;
    this.userName = userProfile.userName;
  }

  getEmail() {
    return this.email;
  }

  getUserName() {
    return this.userName;
  }
}

export default User;
