import fs from 'fs/promises'
import path from 'path'

const STORAGE_DIR = path.resolve(process.cwd(), 'storage')

async function ensureDir() {
  await fs.mkdir(STORAGE_DIR, { recursive: true })
}

function filePath(name: string): string {
  return path.join(STORAGE_DIR, `${name}.json`)
}

async function ensureFile(name: string) {
  await ensureDir()
  const fp = filePath(name)
  try {
    await fs.readFile(fp)
  } catch {
    await fs.writeFile(fp, '[]')
  }
}

export async function readJson<T>(name: string): Promise<T[]> {
  await ensureFile(name)
  const raw = await fs.readFile(filePath(name), 'utf-8')
  return JSON.parse(raw) as T[]
}

export async function writeJson<T>(name: string, data: T[]): Promise<void> {
  await ensureDir()
  const fp = filePath(name)
  const tmp = fp + '.tmp'
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8')
  await fs.rename(tmp, fp)
}

export async function appendJson<T extends object>(name: string, item: T): Promise<void> {
  const data = await readJson<T>(name)
  data.push(item)
  await writeJson(name, data)
}

export async function updateJson<T extends object>(
  name: string,
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): Promise<T | null> {
  const data = await readJson<T>(name)
  const idx = data.findIndex(predicate)
  if (idx === -1) return null
  data[idx] = updater(data[idx])
  await writeJson(name, data)
  return data[idx]
}
