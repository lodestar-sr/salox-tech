import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CallStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(agent: string) {
    return await this.prisma.callHistory.aggregate({
      where: { agent },
      _sum: { duration: true },
      _count: { _all: true, recordingFile: true },
    });
  }
}
