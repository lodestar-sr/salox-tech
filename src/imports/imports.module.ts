import { Module } from '@nestjs/common';

import { ImportsService } from './imports.service';

@Module({
  providers: [ImportsService],
  controllers: [],
})
export class ImportsModule {}
