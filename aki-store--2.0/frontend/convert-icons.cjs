const fs = require('fs');
const path = require('path');

const ICON_MAP = {
    'ShoppingCart': 'faShoppingCart',
    'Menu': 'faBars',
    'User': 'faUser',
    'Store': 'faStore',
    'ShieldAlert': 'faExclamationTriangle',
    'CheckCircle': 'faCheckCircle',
    'CheckCircle2': 'faCheckCircle',
    'Ban': 'faBan',
    'ArrowRight': 'faArrowRight',
    'ArrowLeft': 'faArrowLeft',
    'ExternalLink': 'faExternalLinkAlt',
    'RefreshCcw': 'faSync',
    'Bell': 'faBell',
    'Lock': 'faLock',
    'Activity': 'faChartLine',
    'TrendingUp': 'faArrowTrendUp',
    'AlertTriangle': 'faExclamationTriangle',
    'X': 'faTimes',
    'XCircle': 'faTimesCircle',
    'Play': 'faPlay',
    'Clock': 'faClock',
    'Search': 'faSearch',
    'LogOut': 'faSignOutAlt',
    'LayoutDashboard': 'faTachometerAlt',
    'Settings': 'faCog',
    'Sun': 'faSun',
    'Moon': 'faMoon',
    'ShieldCheck': 'faShieldAlt',
    'Save': 'faSave',
    'Mail': 'faEnvelope',
    'Globe': 'faGlobe',
    'Package': 'faBox',
    'ShoppingBag': 'faShoppingBag',
    'Tags': 'faTags',
    'Plus': 'faPlus',
    'Edit': 'faEdit',
    'Trash2': 'faTrash',
    'Star': 'faStar',
    'MessageSquareWarning': 'faExclamationCircle',
    'MessageSquare': 'faComment',
    'MapPin': 'faMapMarkerAlt',
    'Check': 'faCheck',
    'MessageCircle': 'faCommentDots',
    'Zap': 'faBolt',
    'Box': 'faBoxOpen',
    'BarChart3': 'faChartBar',
    'Users': 'faUsers',
    'DollarSign': 'faDollarSign',
    'Rocket': 'faRocket',
    'ChevronRight': 'faChevronRight',
    'Layout': 'faColumns',
    'CreditCard': 'faCreditCard',
    'Smile': 'faSmile',
    'Filter': 'faFilter',
    'Truck': 'faTruck',
    'ImageIcon': 'faImage',
    'Palette': 'faPalette',
    'Heart': 'faHeart',
    'Monitor': 'faDesktop'
};

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

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Check if lucide-react is imported
    if (content.includes('lucide-react')) {
        // Find which icons are imported
        const match = content.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["'];?/);
        if (match) {
            const importedIcons = match[1].split(',').map(i => i.trim()).filter(Boolean);

            // Generate FontAwesome imports
            let faIconsToImport = [];
            let replacementData = []; // [lucideComponentName, faIconName]

            importedIcons.forEach(icon => {
                let actualName = icon;
                let usageName = icon;

                // Handle aliases like "Image as ImageIcon"
                if (icon.includes(' as ')) {
                    const parts = icon.split(' as ');
                    actualName = parts[0].trim();
                    usageName = parts[1].trim();
                }

                const faName = ICON_MAP[actualName] || 'faIcons'; // fallback
                if (!faIconsToImport.includes(faName)) {
                    faIconsToImport.push(faName);
                }
                replacementData.push({ usageName, faName });
            });

            // Replace the import statement
            const faImportStatement = `import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';\nimport { ${faIconsToImport.join(', ')} } from '@fortawesome/free-solid-svg-icons';`;
            content = content.replace(match[0], faImportStatement);

            // Replace JSX tags
            replacementData.forEach(({ usageName, faName }) => {
                // We need to replace <IconName ... /> with <FontAwesomeIcon icon={faName} ... />
                // Regex to find JSX tags of this icon
                const jsxRegex = new RegExp(`<${usageName}(\\s+[^>]*?)?\\/?>`, 'g');
                content = content.replace(jsxRegex, (match, p1) => {
                    let props = p1 || '';
                    // Remove strokeWidth if it exists
                    props = props.replace(/strokeWidth=\{[^}]+\}/g, '');
                    props = props.replace(/strokeWidth="\d+"/g, '');
                    return `<FontAwesomeIcon icon={${faName}} ${props}/>`;
                });
            });
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log("Converted Lucide -> FontAwesome in: " + filePath);
    }
});
