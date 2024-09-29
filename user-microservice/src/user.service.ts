import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private users: { id: number; username: string; password: string }[] = [];

  constructor() {
    this.loadUsers();
  }

  // Load users from the JSON file
  private loadUsers() {
    const filePath = path.resolve(__dirname, '../users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    this.users = JSON.parse(data);
  }

  // Authenticate user
  async authenticate(username: string, password: string): Promise<boolean> {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      return false;
    }
    // Compare the provided password with the encrypted password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }
}
