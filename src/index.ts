import * as fs from 'fs';
import * as path from 'path';
import { generatorHandler } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/internals';

import { getTemplate } from './utils';

const defaultOutput = 'app/models';

generatorHandler({
  onManifest() {
    return {
      defaultOutput,
      prettyName: 'Prisma CRUD Fns Generator',
    };
  },
  async onGenerate(options: any): Promise<any> {
    if (options.generator.output) {
      const outputDir =
        // This ensures previous version of prisma are still supported
        typeof options.generator.output === 'string'
          ? ((options.generator.output as unknown) as string)
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            parseEnvValue(options.generator.output);

      try {
        await fs.promises.mkdir(outputDir, {
          recursive: true,
        });

        for (let i = 0; i < options.dmmf.datamodel.models.length; i++) {
          const model = options.dmmf.datamodel.models[i];

          await fs.promises.writeFile(
            path.join(defaultOutput, `${model.name.toLowerCase()}.server.ts`),
            getTemplate(model)
          );
        }
      } catch (e) {
        console.error(
          'Error: unable to write files for Prisma Schema Generator'
        );
        throw e;
      }
    } else {
      throw new Error('No output was specified for Prisma Schema Generator');
    }
  },
});
