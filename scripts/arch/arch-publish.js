console.log("aur");

var fs = require('fs');
var path = require('path');

var pkgbuild = `
# Maintainer: ${package.author}

pkgname=${package.name}
pkgver=${package.version}
pkgrel=1
pkgdesc="${package.description}"
arch=(${package.distrib.arch.arch})
url="${package.homepage}"
license=('${package.license}')
depends=('nodejs', 'npm')
makedepends=('nodejs', 'npm')
noextract=()

build() {
    npm install -g jsonie@${package.version} --no-progress --quiet
}
`;

var pkgbuildPath = path.join(__dirname, '../../packages/arch/', 'PKGBUILD');

try {
    fs.mkdirSync(path.join(__dirname, '../../packages/arch/'))
}catch(e) {
    // the path already exists, ok
}

fs.writeFileSync(pkgbuildPath, pkgbuild, 'utf-8');
console.log(indent() + '+ pkgbuild');

function indent(a) {
    if(!a)
        a = 3;
    return new Array(a).join(' ');
}