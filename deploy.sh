npm run build
akamai edgeworkers upload --bundle="dist/bundle.tgz" $1
akamai edgeworkers activate $1 staging "$2"
