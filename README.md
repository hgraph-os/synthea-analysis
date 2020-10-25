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



#### Generating a synthetic dataset

```bash
# download synthea
# this version of synthea is configured with cardiac data
# and exports DSTU2 files
git clone https://github.com/PatientInsight/Synthea.git
cd synthea

# build the utility
./gradlew build check test

# rebuild the utility with the updated modules
./gradlew build check test

# run synthea and create a few thousand test patients
./run_synthea -s 12345 -m *covid* -p 1000 Illinois "Chicago"  
```