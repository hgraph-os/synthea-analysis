# goinvo:synthea-analysis

This package is for analyzing Synthea datasets using the hGraph visualization.  


#### Clone the Example Plugin      

```bash
git clone https://github.com/symptomatic/node-on-fhir  

cd node-on-fhir/packages
git clone https://github.com/symptomatic/synthea-analysis

cd ..
```

#### Run Meteor on FHIR with your plugin  

```bash
# add your package
meteor npm install

# run with a custom settings file
meteor --settings packages/synthea-analysis/configs/settings.example.json  --extra-packages goinvo:synthea-analysis
```


