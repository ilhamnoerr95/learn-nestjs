import { Injectable } from '@nestjs/common';

// custom provider // class provider
export class Connection {
  getConnection(): string {
    return null;
  }
}

@Injectable()
export class mysqlConnection extends Connection {
  getConnection(): string {
    return 'MYSQL DATABASE';
  }
}

@Injectable()
export class mongoConnection extends Connection {
  getConnection(): string {
    return 'MONGO DATABASE';
  }
}
