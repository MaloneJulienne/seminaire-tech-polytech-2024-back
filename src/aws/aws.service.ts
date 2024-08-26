import { Injectable } from '@nestjs/common';
import { fromSSO } from '@aws-sdk/credential-providers';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export default class AwsService {
  private readonly bedrockRuntimeClient: BedrockRuntimeClient;

  constructor() {
    const config: any = {
      region: 'us-east-1',
      credentials: fromSSO({ profile: 'Administrator-access-061342206240' }),
    };

    this.bedrockRuntimeClient = new BedrockRuntimeClient(config);
  }

  getBedrockClient(): BedrockRuntimeClient {
    return this.bedrockRuntimeClient;
  }
}
