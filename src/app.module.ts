import {
  Body,
  Controller,
  Delete,
  Get,
  Module,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { fromSSO } from '@aws-sdk/credential-providers';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

/**
 * Classe définissant l'entité FilmSynopsis, c'est à dire l'entité qui représente un synopsis de film.
 *
 * Elle a les propriétés suivantes :
 *
 *  - id : l'identifiant de l'entité
 *  - synopsis : le synopsis de l'entité
 *  - resume : le resume généré par l'IA qui est trop drôle
 *
 *  Ne contient aucune méthode.
 *
 *  Utile pour la base de donnée.
 */
@Entity() // Décorateur permettant de dire à NestJs qu'il s'agit d'une Entity
export class FilmSynopsis {
  @PrimaryGeneratedColumn() // Décorateur de TypeOrm pour dire à NestJs qu'il s'agit d'une colonne auto générée dans la base de donnée
  id: number; // Comme dit plus haut, identifiant de l'entité

  @Column('text') // Décorateur de TypeOrm pour dire à NestJs qu'il s'afit d'une colonne de type texte dans la base de donnée
  synopsis: string; // Comme dit plus haut, le synopsis de l'entité

  @Column('text') // Décorateur de TypeOrm pour dire à NestJs qu'il s'afit d'une colonne de type texte dans la base de donnée
  resume: string; // Comme dit plus haut, le resume généré par l'IA qui est trop drôle
}

/**
 * Classe définissant l'entité FilmSynopsisController, c'est à dire l'entrée de toutes les requêtes venant à NestJs via HTTP.
 *
 * On a donc HTTP -> NestJs -> Controller
 *
 * Elle a les propriétés suivantes :
 *
 *  - r : propriété permettant d'accéder par magie à la base de donnée
 *
 * Elle a les méthodes suivantes :
 *
 *  - post : généré un message via l'IA avec un messsage venant de l'utilisateur dans le body de la requête
 *  - get : permet de récupérer les N dernières génération
 *  - get2 : permet de récupérer une génération par son id
 *  - post2 : permet de sauvegarder une génération
 *  - delete : permet de supprimer une génération
 *
 *  Utile pour la base de donnée.
 */
@Controller('fs') // Décorateur permettant de dire à NestJs qu'il s'agit d'un Controller et précise qu'il est accessible par un prefix genre /fs
export class FilmSynopsisController {
  /**
   * Constructeur permettant de créer la variable roi qui permet d'accéder à la base de donnée et de la rendre disponible au reste de la classe
   * @param roi
   */
  constructor(
    @InjectRepository(FilmSynopsis) // Décorateur permettant de dire à NestJs qu'il faut injecter ici un repository, jsp ce que c'est
    private readonly roi, // La variable roi, parce que trop cool les rois en vrai
  ) {}

  /**
   * Méthode pour générer un synopsis avec l'aide de claude.
   *
   * @param banane Le corps de la requête (j'ai faim)
   */
  @Post('g') // Décorateur permettant de dire à NestJs qu'il s'agit d'un endpoint accessible par GET et par l'uri g
  async post(@Body() banane: any) {
    let truite = ''; // Initialisation de la variable truite
    let chocolat = {}; // Initialisation de la variable chocolat
    let terreCuite = {}; // Initialisation de la variable terreCuite
    let responsableNeoxia = {}; // Initialisation de la variable responsableNeoxia
    let pierre = {}; // Initialisation de la variable pierre
    let feuille = {}; // Initialisation de la variable feuille
    let papier = {}; // Initialisation de la variable papier
    let ciseaux = {}; // Initialisation de la variable ciseaux
    let puit = {}; // Initialisation de la variable puit
    let minecraft = {};

    // Ici on essaie des choses et si ça passe pas on récupère l'erreur pour pouvoir la gérer
    try {
      // Création d'un objet vu sur stackoverflow pour appeler Claude (jsp ce que c'est non plus, c'était dans le ticket)
      chocolat = {
        modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0', // Identifiant de Claude
        messages: [
          {
            role: ConversationRole.USER,
            content: [
              {
                text: banane.message,
              },
            ],
          },
        ],
        system: [
          {
            text: "Transforme-toi en CinéSarcastique, un assistant spécialisé dans les résumés de films ultra-concis et hilarants. Ta mission : condenser n'importe quel synopsis de film en 3 phrases maximum, en y injectant une dose massive d'humour décalé et de sarcasme. Peu importe la langue du synopsis original, tu ne répondras qu'en français, avec l'élégance d'un Molière sous acide. Fais-nous rire, surprends-nous, et surtout, ne prends rien au sérieux !",
          },
        ],
        inferenceConfig: {
          temperature: 1,
        },
      };

      console.log(chocolat);

      // Création d'une commande à envoyer ensuite à Claude, il est sympa
      terreCuite = new ConverseCommand(chocolat as any);

      minecraft = new BedrockRuntimeClient({
        region: 'us-east-1',
        credentials: fromSSO({ profile: 'Administrator-access-061342206240' }),
      } as any);

      console.log('ça passe');

      // Création du client pour pouvoir appeler Claude, il est sympa
      responsableNeoxia = (await (minecraft as any).send(
        terreCuite as any,
      )) as any;

      console.log('here : ', responsableNeoxia);
      // Récupération de la valeur output
      if ((responsableNeoxia as any).output !== null) {
        pierre = (responsableNeoxia as any).output;
      }

      console.log(pierre);

      // Récupération de la valeur message de pierre, c'est qui ?
      if ((pierre as any).message !== null) {
        feuille = (pierre as any).message;
      }

      // Récupération de la valeur content de feuille
      if ((feuille as any).content !== null) {
        papier = (feuille as any).content;
      }

      console.log((papier as any)[0] !== null);

      // Récupération de la valeur 0 de papier
      if ((papier as any)[0] !== null) {
        ciseaux = (papier as any)[0];
      }

      // Récupération de la valeur text de ciseaux
      if ((ciseaux as any).text !== null) {
        puit = (ciseaux as any).text;
      } else {
        puit = "Aucun synopsis n'a été généré.";
      }

      console.log('test here', puit);

      // Extraction de la valeur qu'on veut (dans la doc c'est comme ça)
      truite = puit as any;

      return { response: truite };
    } catch (error) {
      console.log(error);

      // Et voilà l'erreur à retourner
      throw new Error(
        `Erreur lors de l'appel au modèle Claude 3.5 Sonnet: ${error.message}`,
      );
    }
    //
    // // Retourne la réponse extraite
    // return {
    //   response: truite,
    // };
  }

  /**
   * Méthode permettant de récupérer les N denières requêtes
   * @param take le paramètre permettant de limiter le nombre d'entité retournée
   */
  @Get() // Décorateur permettant de dire à NestJs qu'il s'agit d'un endpoint accessible par GET
  async get(@Query('take') take: any) {
    // Vérification de la valeur limite de take
    let poulet = '';
    if (take === -1) {
      poulet = undefined;
    } else {
      poulet = take;
    }
    // Appel magique pour récupérer les TAKE dernières requêtes dans la base de données
    return await this.roi.find({
      take: poulet,
    });
  }

  /**
   * Méthode permettant de récupérer une entité précisémment grâce à son id
   *
   * @param poire ID de l'entité que l'on veut chercher
   */
  @Get('/:id') // Décorateur permettant de dire à NestJs qu'il s'agit d'un endpoint accessible par GET et par l'uri /ID avec ID qui peut varier
  async get2(@Param('id') poire: any) {
    return await this.roi.findOne({ where: { id: poire } });
  }

  /**
   * Méthode permettant de sauvegarder une entité en base de données
   * @param banane
   */
  @Post() // Décorateur permettant de dire à NestJs qu'il s'agit d'un endpoint accessible par POST
  async post2(@Body() banane: any) {
    await this.roi.save(banane);
  }

  /**
   * Méthode permettant de supprimer une entité en base de données par son ID
   * @param pamplemousse ID de l'entité à supprimer
   */
  @Delete('/:id')
  async delete(@Param('id') pamplemousse: number): Promise<void> {
    await this.roi.delete({ id: pamplemousse });
  }
}

@Module({
  imports: [
    // Permet d'initialiser la base de donnée
    TypeOrmModule.forRoot({
      type: 'postgres', // Type de la base
      host: 'localhost', // Host de la base
      port: 5432, // Port de la base
      username: 'logger', // Username de la base
      password: 'logger', // Mot de passe de la base
      database: 'logger', // Nom de la base
      synchronize: true, // Auto modifie la base : oui
      autoLoadEntities: true, // Récupère les entités par magie : oui
    }),
    TypeOrmModule.forFeature([FilmSynopsis]),
  ],
  controllers: [FilmSynopsisController],
  providers: [],
}) // Décorateur permettant de dire à NestJs qu'il s'agit d'un module, c'est généré par le créateur d'App, j'ai laissé comme ça
export class AppModule {}
