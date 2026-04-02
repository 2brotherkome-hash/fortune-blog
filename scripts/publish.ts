import { execSync } from "child_process";

function run(cmd: string) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { cwd: process.cwd(), stdio: "inherit" });
}

async function main() {
  console.log("Publishing articles to Vercel...\n");

  // Check for uncommitted changes
  const status = execSync("git status --porcelain", {
    cwd: process.cwd(),
    encoding: "utf8",
  });

  if (!status.trim()) {
    console.log("No changes to publish.");
    return;
  }

  console.log("Changes to publish:");
  console.log(status);

  // Stage, commit, push
  run("git add content/articles/");
  run('git commit -m "Add new articles"');
  run("git push origin main");

  console.log("\nPublished! Vercel will automatically deploy the changes.");
}

main().catch(console.error);
