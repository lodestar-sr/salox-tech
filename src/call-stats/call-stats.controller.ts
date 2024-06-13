import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import dayjs from 'dayjs';

import { CallStatsService } from './call-stats.service';
import { CallStatsDto } from './dtos/call-stats.dto';

@ApiTags('CallStats')
@Controller('call-stats')
export class CallStatsController {
  constructor(private readonly callStatsService: CallStatsService) {}

  @SkipThrottle()
  @Get('/')
  @ApiOperation({ summary: 'Get Call Stats' })
  @ApiResponse({ status: 200, description: 'Success', type: CallStatsDto })
  async getAuthors(@Query('agent') agent: string): Promise<CallStatsDto> {
    const result = await this.callStatsService.getStats(agent);
    const callStats = new CallStatsDto();
    callStats.totalCount = result._count._all;
    callStats.countWithRecording = result._count.recordingFile;
    callStats.countWithoutRecording = callStats.totalCount - callStats.countWithRecording;
    callStats.duration = dayjs(result._sum.duration, 's').format('HH:mm:ss');

    return callStats;
  }
}
