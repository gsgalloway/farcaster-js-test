import esbuild from "esbuild"
import fs from "fs/promises"
import path from "path"
import { execSync } from "child_process"

const distDir = "./dist"
const copyFilesScript = "yarn copy-files"
const fileExtensions = [".js", ".ts", ".json"]

// Remove the dist folder
execSync(`rm -rf ${distDir}`)

// Traverse the directory and collect all files with specified extensions
async function collectFiles(dir, fileList = []) {
  const files = await fs.readdir(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) {
      if (!filePath.includes("node_modules")) {
        await collectFiles(filePath, fileList)
      }
    } else {
      if (fileExtensions.includes(path.extname(file))) {
        fileList.push(filePath)
      }
    }
  }

  return fileList
}

console.log("Collecting files...")
const entryPoints = await collectFiles("./")
console.log("Collected " + entryPoints.length + " files")

// Bundle the files using esbuild
try {
  console.log("Building...")
  await esbuild.build({
    entryPoints,
    sourcemap: true,
    loader: { ".json": "copy" },
    format: "esm",
    platform: "node",
    target: "node17",
    outdir: distDir,
    allowOverwrite: true,
    tsconfig: "./tsconfig.json",
  })
  console.log("Copying files...")

  // Copy additional files after bundling is complete
  // execSync(copyFilesScript)
} catch (err) {
  console.error(err)
  process.exit(1)
}
