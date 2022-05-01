/*
 * @Descripttion: root运行子项目脚本
 */

import { execa } from "execa";
import { resolve } from "path";
import inquirer from "inquirer";

const Project = {
  PLATFORM: "platform",
  SERVICE: "service",
  EDITOR: "visual-editor",
};

const CWD = process.cwd();
const PKG_PLATFORM = resolve(CWD, "./packages/platform");
const PKG_SETVICE = resolve(CWD, "./packages/service");
const PKG_VISUALEDITOR = resolve(CWD, `./packages/${Project.EDITOR}`);

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
          name: "node 服务",
          value: "setvice",
        },
        {
          key: "2",
          name: "可视化拖拽",
          value: Project.EDITOR,
        },
      ],
    },
  ]);

  switch (project) {
    case "platform":
      run("npm", ["run", "dev"], { cwd: PKG_PLATFORM });
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
