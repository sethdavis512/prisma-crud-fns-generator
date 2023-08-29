import * as fs from 'fs';
import * as path from 'path';
import { generatorHandler } from '@prisma/generator-helper';

import { getTemplate } from './utils';

const outputDir = './crud';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: outputDir,
      prettyName: 'Prisma CRUD Fns Generator',
    };
  },
  async onGenerate(options: any): Promise<any> {
    try {
      await fs.promises.mkdir(outputDir, {
        recursive: true,
      });

      for (let i = 0; i < options.dmmf.datamodel.models.length; i++) {
        const model = options.dmmf.datamodel.models[i];

        await fs.promises.writeFile(
          path.join('./crud', `${model.name.toLowerCase()}.server.ts`),
          getTemplate(model)
        );
      }
    } catch (e) {
      console.error('Error: unable to write files for Prisma Schema Generator');
      throw e;
    }
  },
});
