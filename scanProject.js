const fs = require("fs");
const path = require("path");
const root = path.resolve(".");
const outFile="project-structure.txt";
function scan(dir, indent=""){
  fs.readdirSync(dir).forEach(item=>{
    const p=path.join(dir,item);
    const s=fs.statSync(p);
    if(s.isDirectory()){ fs.appendFileSync(outFile, indent+"📁 "+item+"\n"); scan(p, indent+"  "); }
    else{ fs.appendFileSync(outFile, indent+"📄 "+item+" ("+s.size+" bytes)\n"); }
  });
}
fs.writeFileSync(outFile, "Project scan: "+root+"\n\n");
scan(root);
console.log("✅ Project scanned! See project-structure.txt");
