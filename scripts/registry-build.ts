import fs from "fs"
import path from "path"
import { components } from "./registry-components"
import { Schema } from "./registry-schema"

const registryComponents = path.join(__dirname, "../public/c")
const registryHooks = path.join(__dirname, "../public/h")

if (!fs.existsSync(registryComponents)) {
  fs.mkdirSync(registryComponents)
}

if (!fs.existsSync(registryHooks)) {
  fs.mkdirSync(registryHooks)
}

for (const component of components) {
  const content = fs.readFileSync(component.path, "utf8")

  const schema = {
    name: component.name,
    type: "registry:ui",
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
    tailwind: component.tailwind || {},
    cssVars: component.cssVars || {
      light: {},
      dark: {},
    },
    description: component.description,
    files: [
      {
        path: `${component.name}.tsx`,
        content,
        type: "registry:ui",
      },
    ],
  } satisfies Schema

  fs.writeFileSync(
    path.join(registryComponents, `${component.name}.json`),
    JSON.stringify(schema, null, 2)
  )
}
