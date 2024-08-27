import { registerAs } from '@nestjs/config';

export interface AwsConfig {
  profile: string;
  region: string;
}

export default registerAs(
  'aws',
  (): AwsConfig => ({
    region: process.env.AWS_REGION,
    profile: process.env.AWS_PROFILE,
  }),
);
