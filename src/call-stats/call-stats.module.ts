import { Module } from '@nestjs/common';

import { CallStatsController } from './call-stats.controller';
import { CallStatsService } from './call-stats.service';

@Module({
  providers: [CallStatsService],
  controllers: [CallStatsController],
})
export class CallStatsModule {}
