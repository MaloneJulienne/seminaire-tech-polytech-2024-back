import { Injectable } from '@nestjs/common';
import AwsService from '../aws/aws.service';
import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
  ConverseCommandInput,
  ConverseCommandOutput,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export default class ClaudeService {
  private readonly bedrockRuntimeClient: BedrockRuntimeClient;

  constructor(private readonly awsConfigService: AwsService) {
    this.bedrockRuntimeClient = this.awsConfigService.getBedrockClient();
  }

  async invokeClaude(
    modelId: string,
    prompt: string,
    userMessage: string,
  ): Promise<string> {
    try {
      const converseCommandConfig: ConverseCommandInput =
        this.createClaudeConfiguration(modelId, prompt, userMessage);

      const command: ConverseCommand = new ConverseCommand(
        converseCommandConfig,
      );

      const response: ConverseCommandOutput =
        await this.bedrockRuntimeClient.send<
          ConverseCommandInput,
          ConverseCommandOutput
        >(command);

      return (
        response?.output?.message?.content?.[0].text ||
        "Aucun synopsis n'a été généré."
      );
    } catch (error) {
      throw new Error(
        `Erreur lors de l'appel au modèle Claude 3.5 Sonnet: ${error.message}`,
      );
    }
  }

  private createClaudeConfiguration(
    modelId,
    prompt,
    userMessage,
  ): ConverseCommandInput {
    return {
      modelId,
      messages: [
        {
          role: ConversationRole.USER,
          content: [
            {
              text: userMessage,
            },
          ],
        },
      ],
      system: [
        {
          text: prompt,
        },
      ],
      inferenceConfig: {
        temperature: 1,
      },
    };
  }
}
