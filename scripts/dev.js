/*
 * @Descripttion: root运行子项目脚本
 */

import { execa } from "execa";
import { resolve } from "path";
import inquirer from "inquirer";

const CWD = process.cwd();
const PKG_PLATFORM = resolve(CWD, "./packages/platform");
const PKG_TEMPLATE = resolve(CWD, "./packages/template");
const PKG_SETVICE = resolve(CWD, "./packages/service");
const PKG_VISUALEDITOR = resolve(CWD, "./packages/visual-editor");

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: "inherit", ...opts });

async function create() {
  const { project } = await inquirer.prompt([
    {
      type: "list",
      message: "请选择要运行的项目：",
      name: "project",
      choices: [
        {
          key: "0",
          name: "lowcode平台",
          value: "platform",
        },
        {
          key: "1",
          name: "h5 template",
          value: "template",
        },
        {
          key: "2",
          name: "node 服务",
          value: "setvice",
        },
        {
          key: "3",
          name: "可视化拖拽",
          value: "visual-editor",
        },
      ],
    },
  ]);

  switch (project) {
    case "platform":
      run("npm", ["run", "dev"], { cwd: PKG_PLATFORM });
      break;
    case "template":
      run("npm", ["run", "dev"], { cwd: PKG_TEMPLATE });
      break;
    case "service":
      run("npm", ["run", "start"], { cwd: PKG_SETVICE });
      break;
    case "visual-editor":
      run("npm", ["run", "dev"], { cwd: PKG_VISUALEDITOR });
      break;
  }
}

create();
