import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

import logger from '../utils/logger';
import { toDash } from '../utils/string-utils';

/**
 * @param {string} path
 * @returns {[{path: string, name: string}]}
 */
export function getDirFiles(path) {
  return readdirSync(path).reduce((prev, name) => {
    const fullPath = resolve(path, name);
    if (statSync(fullPath).isFile()) {
      prev.push({
        name, path: fullPath
      });
    }
    return prev;
  }, []);
}

export async function getRoutersFromDir(path, app) {
  logger.info(`load routes from dir '${path}'`);
  return getDirFiles(path).reduce((result, { path: filePath, name: fileName }) => {
    // eslint-disable-next-line
    const Controller = (require(filePath) || {}).default;
    if (!Controller) {
      logger.warn(`file '${filePath}' export nothing, skip`);
      return result;
    }
    let prefix = toDash(fileName.replace(/-?controller\.js/i, ''));
    if (!prefix || prefix === 'main') {
      prefix = '/';
    } else {
      prefix = `/${prefix}`;
    }
    const routes = new Controller(prefix).mount();
    if (app) {
      app.use(routes);
    }
    result.push(routes);
    return result;
  }, []);
}
