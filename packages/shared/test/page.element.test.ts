import { describe, expect, test } from "vitest";
import { Project } from "../src";

describe("page.element", () => {
  const project = Project.create();
  test("project.page.length === 1", () => {
    expect(project.pages.length).toBe(1);
  });
  test("project.name", () => {
    expect(project.name).toBe("New Project");
  });
  test("project.json", () => {
    expect(project.getJson()).toMatchInlineSnapshot(`
      {
        "description": "New Project Description",
        "name": "New Project",
        "pages": [
          {
            "description": "New Page Description",
            "elements": [],
            "name": "New Page",
          },
        ],
      }
    `);
  });
});
