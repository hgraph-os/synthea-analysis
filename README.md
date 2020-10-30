# goinvo:synthea-analysis

This package is for analyzing Synthea datasets using the hGraph visualization.  

#### Generating a synthetic dataset

```bash
# download synthea
git clone https://github.com/synthetichealth/synthea
cd synthea

# build the utility
./gradlew build check test

# generate a thousand test patients
./run_synthea -s 12345 -m covid19 -p 1000 Illinois "Chicago"  
```


#### Clone the Example Plugin      

```bash
#install meteor
curl https://install.meteor.com/ | sh

# clone the node-on-fhir boilerplate  
git clone https://github.com/symptomatic/node-on-fhir  

# navigate to the packages directory, and clone the synthea-analysis package into it
cd node-on-fhir  
cd packages  
git clone https://github.com/symptomatic/synthea-analysis

# return to the project root 
cd ..
```

#### Run Meteor on FHIR with your plugin  

```bash
# install dependencies and libraries
meteor npm install

# run with a custom settings file, using the extra package  
run --settings packages/synthea-analysis/configs/settings.synthea.json --extra-packages symptomatic:data-management,symptomatic:hgraph-on-fhir,goinvo:synthea-analysis

# run with a custom settings file, using the extra package  
INITIALIZE_SYNTHEA_DATA=true meteor run --settings packages/synthea-analysis/configs/settings.synthea.json --extra-packages goinvo:synthea-analysis

```



 