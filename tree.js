const fs = require("fs");
const path = require("path");

// ❌ Exclude these files/folders
const ignoreList = [
  "node_modules",
  ".git",
  ".vscode",
  "dist",
  "build",
  "uploads",
  ".env"
];

// 🔁 Recursive function
function printTree(dir, prefix = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    if (ignoreList.includes(file)) return;

    const fullPath = path.join(dir, file);
    const isLast = index === files.length - 1;

    const connector = isLast ? "└── " : "├── ";
    console.log(prefix + connector + file);

    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(fullPath, newPrefix);
    }
  });
}

// ▶ Run from current directory
printTree(process.cwd());