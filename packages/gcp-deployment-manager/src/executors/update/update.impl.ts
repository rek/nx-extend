import { ExecutorContext } from '@nrwl/devkit'
import { buildCommand, execCommand } from '@nx-extend/core'

import { ExecutorSchema } from '../schema'

export interface Options extends ExecutorSchema {
  deletePolicy?: string
  createPolicy?: string
}

export async function updateExecutor(
  options: Options,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { sourceRoot } = context.workspace.projects[context.projectName]

  return Promise.resolve(execCommand(buildCommand([
    'gcloud deployment-manager deployments update',
    options.name || context.projectName,
    `--config=${options.file}`,

    options.project && `--project=${options.project}`,
    options.createPolicy && `--create-policy=${options.createPolicy}`,
    options.deletePolicy && `--delete-policy=${options.deletePolicy}`,
    options.preview && `--preview`
  ]), {
    cwd: sourceRoot
  }))
}

export default updateExecutor
