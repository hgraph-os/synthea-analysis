Package.describe({
    name: 'symptomatic:synthea-analysis',
    version: '0.3.0',
    summary: 'Dashboard for Synthea analysis',
    git: 'https://github.com/symptomatic/synthea-analysis',
    documentation: 'README.md'
});
  
Package.onUse(function(api) {
    api.versionsFrom('1.4');
    
    api.use('meteor-base@1.4.0');
    api.use('ecmascript@0.13.0');
    api.use('react-meteor-data@0.2.15');
    api.use('session');
    api.use('mongo');
    
    if(Package['clinical:fhir-vault-server']){
        api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
    }
     
    api.use('clinical:hl7-fhir-data-infrastructure@6.4.11');

    api.use('aldeed:collection2@3.0.0');
    api.use('simple:json-routes@2.1.0');

    api.addFiles('lib/collection.js');

    api.addFiles('server/methods.js', 'server');
    api.addFiles('server/rest.js', 'server');

    api.mainModule('index.jsx', 'client');
});


Npm.depends({
    "@nivo/core": "0.61.0",
    "@nivo/line": "0.61.1"
})