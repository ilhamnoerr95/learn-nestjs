import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

// factory provider
export function createConnection(configProvider: ConfigService): Connection {
  const connectionType = configProvider.get('CONNECTION_DB');
  if (connectionType === 'mysql') {
    return new mysqlConnection();
  } else if (connectionType === 'mongo') {
    return new mongoConnection();
  }
  return new Connection();
}
