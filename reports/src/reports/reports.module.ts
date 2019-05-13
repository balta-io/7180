import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportsResolver } from './report.resolver';

@Module({
    providers: [ReportService, ReportsResolver],
})
export class ReportsModule { }
