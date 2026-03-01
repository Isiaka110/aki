const fs = require('fs');
const path = require('path');

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

const targetDir = path.join(__dirname, 'src');

walkDir(targetDir, function (filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove use client
    content = content.replace(/"use client";\n?/g, '');
    content = content.replace(/'use client';\n?/g, '');

    // Link
    content = content.replace(/import Link from ["']next\/link["'];?/g, "import { Link } from 'react-router-dom';");
    content = content.replace(/import { Link } from ["']next\/link["'];?/g, "import { Link } from 'react-router-dom';");

    // Image
    if (content.includes('next/image')) {
        content = content.replace(/import Image from ["']next\/image["'];?/g, '');
        content = content.replace(/<Image/g, '<img');
    }

    // next/font/google
    content = content.replace(/import { Geist, Geist_Mono, Cinzel } from ["']next\/font\/google["'];?/g, '');

    // next/navigation
    if (content.includes('next/navigation')) {
        // Collect what's being imported
        const match = content.match(/import\s+{([^}]+)}\s+from\s+['"]next\/navigation['"];?/);
        if (match) {
            const importsText = match[1];
            let newImports = [];
            if (importsText.includes('usePathname')) newImports.push('useLocation');
            if (importsText.includes('useParams')) newImports.push('useParams');
            if (importsText.includes('useRouter')) newImports.push('useNavigate');

            let routerImportLine = `import { ${newImports.join(', ')} } from 'react-router-dom';`;
            content = content.replace(match[0], routerImportLine);

            // Replaces: useRouter() -> useNavigate()
            // usePathname() -> useLocation().pathname
            content = content.replace(/useRouter\(\)/g, "useNavigate()");
            content = content.replace(/usePathname\(\)/g, "useLocation().pathname");
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log("Fixed:", filePath);
    }
});
