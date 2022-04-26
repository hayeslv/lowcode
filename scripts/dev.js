/*
 * @Descripttion: root运行子项目脚本
 */

const execa = require("execa");
const { resolve } = require("path");
const inquirer = require("inquirer");

const CWD = process.cwd();
const PKG_PLATFORM = resolve(CWD, "./packages/platform");
const PKG_SETVICE = resolve(CWD, "./packages/service");

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
          name: "",
        },
      ],
    },
  ]);
}

create();
