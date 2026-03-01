const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'app');
const destDir = path.join(__dirname, 'src', 'pages');
const baseSrc = path.join(__dirname, 'src');

function transformContent(content, relFilePath) {
    let newContent = content.replace(/"use client";\n?/g, '');

    // Replace next/link
    newContent = newContent.replace(/import Link from ["']next\/link["'];?/g, 'import { Link } from "react-router-dom";');

    // Replace next/navigation useRouter
    newContent = newContent.replace(/import { useRouter } from ["']next\/navigation["'];?/g, 'import { useNavigate as useRouter } from "react-router-dom";');

    // Replace next/image
    newContent = newContent.replace(/import Image from ["']next\/image["'];?/g, '');

    // Components are now at src/components
    // The relative paths like ../../components/Foo need to just be relative to the new depth
    // Or we can cheat and use alias, or just relative
    return newContent;
}

function walkDir(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkDir(filePath, callback);
        }
    });
}

walkDir(srcDir, function (filePath) {
    if (filePath.includes('api\\') || filePath.includes('components\\') || filePath.includes('store\\')) return;
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let relPath = path.relative(srcDir, filePath);

        // Remove route groups like (marketing), (storefront)
        let cleanedRelPath = relPath.replace(/\([^)]+\)\\/g, '');

        let destPath = path.join(destDir, cleanedRelPath);

        let content = fs.readFileSync(filePath, 'utf8');
        content = transformContent(content, cleanedRelPath);

        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, content);
        console.log(`Copied: ${relPath} -> ${cleanedRelPath}`);
    }
});
