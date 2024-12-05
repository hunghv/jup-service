import { User } from 'src/entities/user.entity';
import { CreateUserFirebaseDto } from './creaate-user-firebase.dto';

export class CreateUserDto extends User {
  firebaseUser: CreateUserFirebaseDto;
}
