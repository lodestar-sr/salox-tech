import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import dayjs from 'dayjs';
import { PrismaService } from 'nestjs-prisma';
import { map } from 'remeda';

import { ImportConfig } from '@/config/configuration';

@Injectable()
export class ImportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async import(page: number) {
    const importConfig = this.configService.get<ImportConfig>('import');
    const importRecord = await this.prisma.importHistory.findUnique({ where: { page } });
    if (!importRecord || (importRecord && !importRecord.imported)) {
      const result = await axios.get(importConfig.url, { params: { page } });
      const records = map(result.data?.records || [], (r: any) => {
        const timeParts = (r.duration || '00:00:00').split(':');
        const duration = dayjs
          .duration({ hours: timeParts[0], minutes: timeParts[1], seconds: timeParts[2] })
          .asSeconds();
        return {
          uuid: r.uuid,
          agent: r.agent,
          duration,
          recordingFile: r.recordingfile,
        };
      });
      await this.prisma.$transaction(async (tx) => {
        await tx.callHistory.createMany({ data: records });
        await tx.importHistory.create({ data: { page, imported: true } });
      });

      console.log(`Page ${page} imported successfully!`);
    } else {
      console.log(`Page ${page} already imported!`);
    }
  }

  async importAll() {
    const pagePromises: any[] = [];
    for (let page = 1; page <= 100; page++) {
      pagePromises.push(this.import(page));
    }
    await Promise.all(pagePromises);
  }
}
