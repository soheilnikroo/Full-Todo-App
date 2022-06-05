import { UserType } from '../types';

class User {
  email: string;
  userName: string;
  imageUrl: string;

  constructor(public userProfile: UserType) {
    this.email = userProfile.email;
    this.userName = userProfile.userName;
    this.imageUrl = userProfile.imageUrl;
  }

  getEmail() {
    return this.email;
  }

  getUserName() {
    return this.userName;
  }

  getImageUrl() {
    return this.imageUrl;
  }
}

export default User;
