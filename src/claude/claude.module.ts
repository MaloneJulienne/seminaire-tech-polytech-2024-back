import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import ClaudeService from './claude.service';

@Module({
  imports: [AwsModule],
  exports: [ClaudeService],
  providers: [ClaudeService],
})
export default class ClaudeModule {}
