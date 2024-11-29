import { Injectable } from '@nestjs/common';
import { Connection } from '../user/connection';

@Injectable()
export class ThirdParty {
  connection: Connection;
  constructor(test: Connection) {
    this.connection = test;
  }
  save() {
    console.info(`Save our connection to ${this.connection.getConnection()}`);
  }
}

// paramsnya akan terinnject secara otomatis
export function createThirParty(connection: Connection): ThirdParty {
  const thirdPart = new ThirdParty(connection);

  //   thirdPart.connection = connection;

  return thirdPart;
}
