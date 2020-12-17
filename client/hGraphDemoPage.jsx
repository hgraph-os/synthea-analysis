
import React, { useEffect, useState } from 'react';
import { useTracker } from '@ledgy/react-meteor-data';
import { browserHistory } from 'react-router';

import { get, has } from 'lodash';

import { Session } from 'meteor/session';
import { HTTP } from 'meteor/http';
import { EJSON } from 'meteor/ejson';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Container';



import HGraph from 'hgraph-react'; // symlinked with 'yarn link' from project root.
import { StyledCard, PageCanvas, PatientsTable } from 'material-fhir-ui';

import { 
  AllergyIntolerancesTable, 
  CarePlansTable,
  ConditionsTable, 
  DiagnosticReportsTable,
  ImmunizationsTable, 
  MedicationStatementsTable,
  MedicationOrdersTable,
  ObservationsTable,  
  ProceduresTable,
  DynamicSpacer,
  AllergyIntolerances,
  CarePlans,
  Conditions,
  Immunizations,
  MedicationStatements,
  Observations,
  Patients
} from 'meteor/clinical:hl7-fhir-data-infrastructure';

import { scaleLinear } from 'd3-scale';
import metrics from '../metrics/metrics.healthrecords.json';

let biomarkerReferenceRanges = [
  {
    "metric": "totalCholesterol",
    "value": 0,
    "children": [
      {
        "metric": "ldl",
        "value": 100
      },
      {
        "metric": "hdl",
        "value": 50
      },
      {
        "metric": "triglycerides",
        "value": 200
      }
    ]
  },
  {
    "metric": "bloodPressureSystolic",
    "label": "Systolic blood pressure",
    "healthyMin": 100,
    "healthyMax": 140,
    "absoluteMin": 80,
    "absoluteMax": 200,
    "value": 120
  },
  {
    "metric": "bloodPressureDiastolic",
    "label": "Diastolic blood pressure",
    "healthyMin": 60,
    "healthyMax": 100,
    "absoluteMin": 0,
    "absoluteMax": 200,
    "value": 80
  },
  {
    "metric": "weight",
    "label": "Body weight Measured",
    "healthyMin": 120,
    "healthyMax": 200,
    "absoluteMin": 80,
    "absoluteMax": 240,
    "value": 140
  },
  {
    "metric": "pulse",
    "label": "Heart rate",
    "healthyMin": 50,
    "healthyMax": 80,
    "absoluteMin": 30,
    "absoluteMax": 120,
    "value": 60
  },
  {
    "metric": "bloodOxygenation",
    "label": "Oxygen saturation in Blood",
    "healthyMin": 90,
    "healthyMax": 100,
    "absoluteMin": 70,
    "absoluteMax": 100,
    "value": 98
  },
  {
    "metric": "temperature",
    "label": "Body temperature (F)",
    "healthyMin": 96,
    "healthyMax": 99,
    "absoluteMin": 90,
    "absoluteMax": 108,
    "value": 98.6
  },
  {
    "metric": "temperatureCelcius",
    "label": "Body temperature (C)",
    "healthyMin": 36,
    "healthyMax": 38,
    "absoluteMin": 32,
    "absoluteMax": 42,
    "value": 37
  }
];

//==========================================================================================
// Helper Functions

const hGraphConvert = (gender, metric, data) => {
  const metricObj = metrics[gender][metric];
  //const sortedValues = data.values.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    label: data.label || metricObj.label,
    value: data.value || metricObj.value[0],
    values: data.values,

    healthyMin: data.healthyMin || metricObj.healthyRange[0],
    healthyMax: data.healthyMax || metricObj.healthyRange[1],
    absoluteMin: data.absoluteMin || metricObj.absoluteRange[0],
    absoluteMax: data.absoluteMax || metricObj.absoluteRange[1],
    weight: data.weight || metricObj.weight,
    unitLabel: data.unitLabel || metricObj.unitLabel
  }
}


//==========================================================================================
// Synthetic Patients   



import AndreaSantillanBodyWeight from '../lib/AndreaSantillan.Observation.BodyWeight.json';
import AndreaSantillanBloodPressure from '../lib/AndreaSantillan.Observation.BloodPressure.json';
import AndreaSantillanHeartRate from '../lib/AndreaSantillan.Observation.HeartRate.json';
import AndreaSantillanOralTemperature from '../lib/AndreaSantillan.Observation.OralTemperature.json';
import AndreaSantillanOxygenSaturation from '../lib/AndreaSantillan.Observation.OxygenSaturation.json';

import Andrea7_Santillán790_befab5de from '../data/Andrea7_Santillán790_befab5de-4562-37da-07d3-1a2b188b679a.json';
import Ann985_Medhurst46_c7f40e00 from '../data/Ann985_Medhurst46_c7f40e00-f81b-a1cc-8940-9bb3ea4cb235.json';
import Billye739_Rau926_06d367b1 from '../data/Billye739_Rau926_06d367b1-bf0b-3bf9-dff7-8bebaf29236b.json';

let AndreaSantillán;
let AnnMedhurst;
let BillyeRau;

let andreaObservations = [];

Meteor.startup(function(){

  console.log('Andrea7_Santillán790_befab5de', Andrea7_Santillán790_befab5de)
  console.log('Ann985_Medhurst46_c7f40e00', Ann985_Medhurst46_c7f40e00)
  console.log('Billye739_Rau926_06d367b1', Billye739_Rau926_06d367b1)

  if(Array.isArray(Andrea7_Santillán790_befab5de.entry)){
    Andrea7_Santillán790_befab5de.entry.forEach(function(entry){
      if(get(entry, 'resource.resourceType') === "Patient"){
        AndreaSantillán = entry.resource;
      }
      if(get(entry, 'resource.resourceType') === "Observation"){
        andreaObservations.push(entry.resource);
      }
    })
  }
  if(Array.isArray(Ann985_Medhurst46_c7f40e00.entry)){
    Ann985_Medhurst46_c7f40e00.entry.forEach(function(entry){
      if(get(entry, 'resource.resourceType') === "Patient"){
        AnnMedhurst = entry.resource;
      }
    })
  }
  if(Array.isArray(Billye739_Rau926_06d367b1.entry)){
    Billye739_Rau926_06d367b1.entry.forEach(function(entry){
      if(get(entry, 'resource.resourceType') === "Patient"){
        BillyeRau = entry.resource;
      }
    })
  }

  console.log('AndreaSantillán', AndreaSantillán)
  console.log('AnnMedhurst', AnnMedhurst)
  console.log('BillyeRau', BillyeRau)

  Session.setDefault('hideToggles', true);
  Session.setDefault('systemOfMeasurement', 'imperial');
  Session.setDefault('selectedPatientId', AndreaSantillán.id);
  Session.setDefault('selectedPatient', AndreaSantillán) 

})


function generateAndreaSantillanSampleData(){
  let resultsArray = [];
  let datum;



  biomarkerReferenceRanges.forEach(function(biomarker){
    switch(biomarker.metric){
      case "bloodPressureSystolic":
        datum = biomarker;
        datum.weight = 10;
        if(AndreaSantillanBloodPressure){
          console.log('Most recent systolic BP observation', AndreaSantillanBloodPressure);
          components = get(AndreaSantillanBloodPressure, 'component');
          components.forEach(function(component){
            if(get(component, 'code.coding[0].code') === "8480-6"){
              datum.value = get(component, 'valueQuantity.value', 0)
            }
          })          
        }
        resultsArray.push(datum);  
      break;
      case "bloodPressureDiastolic":
        datum = biomarker;
        datum.weight = 10;

        if(AndreaSantillanBloodPressure){
          console.log('Most recent diastolic BP observation', AndreaSantillanBloodPressure);
          components = get(AndreaSantillanBloodPressure, 'component');
          components.forEach(function(component){
            if(get(component, 'code.coding[0].code') === "8462-4"){
              datum.value = get(component, 'valueQuantity.value', 0)
            }
          })
        }
        resultsArray.push(datum);  
        break;
      case "temperature":
        datum = biomarker;
        datum.weight = 30;

        if(AndreaSantillanOralTemperature){
          console.log('Most recent temperature observation', AndreaSantillanOralTemperature);
          datum.value = get(AndreaSantillanOralTemperature, 'valueQuantity.value');
        }
        if(get(AndreaSantillanOralTemperature, 'valueQuantity.unit') === "F"){
          resultsArray.push(datum);  
        }            
      break;
      case "temperatureCelcius":
        datum = biomarker;
        datum.weight = 30;

        if(AndreaSantillanOralTemperature){
          console.log('Most recent temperature observation', AndreaSantillanOralTemperature);
          datum.value = get(AndreaSantillanOralTemperature, 'valueQuantity.value');
        }
        if(get(AndreaSantillanOralTemperature, 'valueQuantity.unit') === "Cel"){
          resultsArray.push(datum);  
        }

        break;
      case "pulse":
        datum = biomarker;
        datum.weight = 10;

        if(AndreaSantillanHeartRate){
          console.log('Most recent pulse observation', AndreaSantillanHeartRate);
          datum.value = get(AndreaSantillanHeartRate, 'valueQuantity.value');
        }
        resultsArray.push(datum);  

        break;
      case "bloodOxygenation":
        datum = biomarker;
        datum.weight = 20;

        if(AndreaSantillanOxygenSaturation){
          console.log('Most recent blood oxygenation observation', AndreaSantillanOxygenSaturation);
          datum.value = get(AndreaSantillanOxygenSaturation, 'valueQuantity.value');
        }
        resultsArray.push(datum);  

        break;
      case "waistCircumference":
        datum = biomarker;
        datum.weight = 20;

        if(lastWaistCircumference){
          console.log('Most recent waist circumfrence observation', lastWaistCircumference);
          datum.value = get(lastWaistCircumference, 'valueQuantity.value');
        }
        resultsArray.push(datum);  

      break;
      case "weight":
        datum = biomarker;
        datum.weight = 20;

        if(AndreaSantillanBodyWeight){
          console.log('Most recent weight observation', AndreaSantillanBodyWeight);
          datum.value = get(AndreaSantillanBodyWeight, 'valueQuantity.value');
        }
        resultsArray.push(datum);  

      break;
    }
  })

  return resultsArray;
}


//==========================================================================================
// Main Component




export function SyntheaAnalysisPage(props){


  let firstPatientName = "";
  let firstPatientId = "";

  let secondPatientName = "";
  let secondPatientId = "";

  let thirdPatientName = "";
  let thirdPatientId = "";


  let data = {
    query: {},
    currentYearData: [],
    currentScore: 0,
    observations: [],
    patients: [],
    selectedPatientId: ''
  };



  data.observations = useTracker(function(){
    return Observations.find({'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId')}).fetch();
  }, [props.lastUpdated])
  data.patients = useTracker(function(){
    return Patients.find().fetch();
  }, [])
  data.selectedPatientId = useTracker(function(){
    return Session.get('selectedPatientId');
  }, [])

  if(AndreaSantillán){
    firstPatientName = get(AndreaSantillán, 'name.0.given.0') + ' ' + get(AndreaSantillán, 'name.0.family');;
    firstPatientId = get(AndreaSantillán, 'id');
  }
  if(AnnMedhurst){
    secondPatientName = get(AnnMedhurst, 'name.0.given.0') + ' ' + get(AnnMedhurst, 'name.0.family');;
    secondPatientId = get(AnnMedhurst, 'id');
  }
  if(BillyeRau){
    thirdPatientName = get(BillyeRau, 'name.0.given.0') + ' ' + get(BillyeRau, 'name.0.family');;
    thirdPatientId = get(BillyeRau, 'id');
  }




    // update sample dataset
    let components;
    let diastolic;
    let systolic;



    console.log('Parsing biomarkerReferenceRanges', biomarkerReferenceRanges);

    let resultingData = [];

    // is any data available in the observations cursor?
    if(data.observations.length > 0){
      biomarkerReferenceRanges.forEach(function(datum){
        switch (datum.metric) {
          // case "totalCholesterol":
          //   console.log('Observations.find(cholesterol)', Observations.find().count())
          //   datum.value = 0.5;
          //   datum.weight = 0;
          //   resultingData.push(datum);
          //   break;
          case "bloodPressureSystolic":
            // console.log('Observations.find().bloodPressureSystolic', Observations.find({'component.code.coding.code': '8480-6'}).count())
            let lastSystolicObservation = Observations.find({$or: [
                {'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '55284-4'},
                {'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'component.code.coding.code': '8480-6'},
              ]}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastSystolicObservation', lastSystolicObservation)
            if(lastSystolicObservation){
              console.log('Most recent systolic BP observation', lastSystolicObservation);
              components = get(lastSystolicObservation, 'component');
              components.forEach(function(component){
                if(get(component, 'code.coding[0].code') === "8480-6"){
                  datum.value = get(component, 'valueQuantity.value', 0)
                }
              })
              datum.weight = 10;
              resultingData.push(datum);  
            }
            break;
          case "bloodPressureDiastolic":
  
            let lastDiastolicObservation = Observations.find({$or: [
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '55284-4' },
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'component.code.coding.code': '8462-4'},
            ]}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastDiastolicObservation', lastDiastolicObservation)
            if(lastDiastolicObservation){
              console.log('Most recent diastolic BP observation', lastDiastolicObservation);
              components = get(lastDiastolicObservation, 'component');
              components.forEach(function(component){
                if(get(component, 'code.coding[0].code') === "8462-4"){
                  datum.value = get(component, 'valueQuantity.value', 0)
                }
              })
              datum.weight = 10;
              resultingData.push(datum);  
            }
            break;
          case "temperature":
            let lastTemperatureObservation = Observations.find({$or: [
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '8310-5' },
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '8331-1' },
            ]}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastTemperatureObservation', lastTemperatureObservation)
            if(lastTemperatureObservation){
              console.log('Most recent temperature observation', lastTemperatureObservation);
              datum.value = get(lastTemperatureObservation, 'valueQuantity.value');
              datum.weight = 30;
              if(get(lastTemperatureObservation, 'valueQuantity.unit') === "F"){
                resultingData.push(datum);  
              }            
            }
            break;
          case "temperatureCelcius":
            let lastCelciusObservation = Observations.find({$or: [
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '8310-5' },
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '8331-1' },
            ]}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastCelciusObservation', lastCelciusObservation)
            if(lastCelciusObservation){
              console.log('Most recent temperature observation', lastCelciusObservation);
              datum.value = get(lastCelciusObservation, 'valueQuantity.value');
              datum.weight = 30;
              if(get(lastCelciusObservation, 'valueQuantity.unit') === "Cel"){
                resultingData.push(datum);  
              }
            }
            break;
          case "pulse":
            let lastPulseObservation = Observations.find({
              'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'),
              'code.coding.code': '8867-4'}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastPulseObservation', lastPulseObservation)
            if(lastPulseObservation){
              console.log('Most recent pulse observation', lastPulseObservation);
              datum.value = get(lastPulseObservation, 'valueQuantity.value');
              datum.weight = 10;
              resultingData.push(datum);  
            }
            break;
          case "bloodOxygenation":
            let lastBloodOxygenation = Observations.find({
              $or: [
                {'code.coding.code': '20564-1', 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId')},
                {'code.coding.code': '2708-6', 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId')}              
              ]}, 
              {sort: {'effectiveDateTime': -1}}).fetch()[0];
              console.log('hGraphDemoPage.lastBloodOxygenation', lastBloodOxygenation)
            if(lastBloodOxygenation){
              console.log('Most recent blood oxygenation observation', lastBloodOxygenation);
              datum.value = get(lastBloodOxygenation, 'valueQuantity.value');
              datum.weight = 20;
              resultingData.push(datum);  
            }
            break;
  
          case "waistCircumference":
            let lastWaistCircumference = Observations.find({
              'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'),
              'code.coding.code': '56115-9'}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastWaistCircumference', lastWaistCircumference)          
            if(lastWaistCircumference){
              console.log('Most recent waist circumfrence observation', lastWaistCircumference);
              datum.value = get(lastWaistCircumference, 'valueQuantity.value');
              datum.weight = 20;
              resultingData.push(datum);  
            }
          case "weight":
            // console.log('Observations.find(weight)', Observations.find({'code.coding.code': '29463-7'}).count())
            let lastWeightMeasurement = Observations.find({$or: [
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '3141-9' },
              { 'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId'), 'code.coding.code': '29463-7' }
            ]}, {sort: {'effectiveDateTime': -1}
            }).fetch()[0];
            console.log('hGraphDemoPage.lastWeightMeasurement', lastWeightMeasurement)          
            if(lastWeightMeasurement){
              console.log('Most recent weight observation', lastWeightMeasurement);
              datum.value = get(lastWeightMeasurement, 'valueQuantity.value');
  
              // if(Session.equals('systemOfMeasurement', 'imperial')){
              //   datum.value = datum.value * 2.205;
              // }
  
              datum.weight = 20;
              resultingData.push(datum);  
            }
            break;
                  
          case "alcoholUse":
            // datum.value = 0;
            // datum.weight = 20;
            // resultingData.push(datum);
            break;
          case "nicotineUse":
            // datum.value = 0;
            // datum.weight = 20;
            // resultingData.push(datum);
            break;
          case "painLevel":
            // datum.value = 0;
            // datum.weight = 20;
            // resultingData.push(datum);
            break;
          case "exercise":
            // datum.value = 8;
            // resultingData.push(datum);
            break;
          case "sleep":
            // datum.value = 8;
            // resultingData.push(datum);
            break;
          case "happiness":
            // datum.value = 9;
            // resultingData.push(datum);
            break;
          case "glucose":
            // datum.value = 70;
            // resultingData.push(datum);
            break;
          case "other":
            // datum.value = 0.5;
            // resultingData.push(datum);
            break;
                    
          default:
            break;
        }
      })
  
    } else {
      // no data available in the observation cursor.  :(
      // lets use the sample patient instead
      resultingData = generateAndreaSantillanSampleData();
    }


    console.log('resultingData', resultingData)

    data.currentYearData = convertDataSet(resultingData);
    console.log('data.currentYearData', data.currentYearData)

    data.currentScore = parseInt(calculateHealthScore(convertDataSet(resultingData)), 10);



    // if (Session.get('appWidth') < 768) {
    //   data.style.inactiveIndexCard.width = '100%';
    //   data.style.inactiveIndexCard.marginBottom = '10px';
    //   data.style.inactiveIndexCard.paddingBottom = '10px';
    //   data.style.inactiveIndexCard.paddingLeft = '0px';
    //   data.style.inactiveIndexCard.paddingRight = '0px';

    //   data.style.spacer.display = 'none';
    // }

    // if(Session.get('appHeight') > 1200){
    //   data.style.page = {
    //     top: '50%',
    //     transform: 'translateY(-50%)',
    //     position: 'relative'
    //   }
    // }

    //if(Meteor.user()){


      
    //   if(AllergyIntolerances){
    //     data.ccd.allergyIntolerances = useTracker(function(){
    //       return AllergyIntolerances.find().fetch();
    //     }, [])
    //   }
    //   if(CarePlans){
    //     data.ccd.carePlans = useTracker(function(){
    //       return CarePlans.find().fetch();
    //     }, [])
    //   }
    //   if(Conditions){
    //     data.ccd.conditions = useTracker(function(){
    //       let conditionsQuery = {};
    //       if(data.query){
    //         conditionsQuery = data.query;
    //       }
    //       if(Session.get('hideEnteredInError')){          
    //         conditionsQuery.verificationStatus = {$nin: ["entered-in-error"]}  // unconfirmed | provisional | differential | confirmed | refuted | entered-in-error
    //       }
    //       return Conditions.find(conditionsQuery).fetch();
    //     }, [])
    //   }
    //   if(DiagnosticReports){
    //     data.ccd.diagnosticReports = useTracker(function(){
    //       return DiagnosticReports.find().fetch();
    //     }, [])
    //   }
    //   if(Immunizations){
    //     data.ccd.immunizations = useTracker(function(){
    //       return Immunizations.find().fetch();
    //     }, [])
    //   }
    //   if(Medications){
    //     data.ccd.medications = useTracker(function(){
    //       return Medications.find().fetch();
    //     }, [])
    //   }
    //   if(MedicationOrders){
    //     data.ccd.medicationOrders = useTracker(function(){
    //       return MedicationOrders.find().fetch();
    //     }, [])
    //   }        
    //   if(MedicationStatements){
    //     data.ccd.medicationStatements = useTracker(function(){
    //       return MedicationStatements.find().fetch();
    //     }, [])
    //   }
    //   if(Patients){
    //     data.ccd.patients = useTracker(function(){
    //       return Patients.find().fetch();
    //     }, [])
    //   }
    //   if(Observations){
    //     data.ccd.observations = useTracker(function(){
    //       return Observations.find().fetch();
    //     }, [])
    //   }
    //   if(Procedures){
    //     data.ccd.procedures = useTracker(function(){
    //       return Procedures.find().fetch();
    //     }, [])
    //   }  
    // //}

    console.log("SyntheaAnalysisPage[data]", data);



  function calculateScoreFromMetric(metric){
    let scale;
  
    // TODO: Review score calcs
    if (metric.value > metric.healthyMax) {
      // if it's high, healthyMax to absoluteMax, 1 to 0
      scale = scaleLinear()
        .domain([metric.healthyMax, metric.absoluteMax])
        .range([1, 0]);
    } else if (metric.value < metric.healthyMin) {
      // if it's low, healthyMin to absolute Min, 1 to 0
      scale = scaleLinear()
        .domain([metric.healthyMin, metric.absoluteMin])
        .range([1, 0]);
    } else {
      // if it's healthy, perfect score
      return 1;
    }
  
    return scale(metric.value);
  }
  function calculateHealthScore(data){
    // TODO: Review score calcs

    let totalWeight = 0;
    data.map(d => {
      totalWeight += d.weight;
    });

    if (totalWeight !== 100) {
      console.log("Total weight of values does not equal 100%");
    }

    let scoreTotal = 0;

    data.map(d => {
      const score = calculateScoreFromMetric(d);
      const weightPercentage = d.weight / 100;
      const weightedScore = weightPercentage * score;
      scoreTotal += weightedScore;
    });

    return scoreTotal * 100;
  }
  function convertDataSet(data){
    //console.log('Converting data set', data)
    return data.map(d => {
      const converted = hGraphConvert('male', d.metric, d);
      converted.id = d.metric;
      if (d.children) {
        converted.children = d.children.map(c => {
          const convertedChild = hGraphConvert('male', c.metric, c);
          convertedChild.parentKey = c.parentKey;
          convertedChild.id = c.metric;
          return convertedChild;
        })
      }
      return converted;
    });
  }

  


  let headerHeight = LayoutHelpers.calcHeaderHeight();
  let formFactor = LayoutHelpers.determineFormFactor(2);
  let paddingWidth = LayoutHelpers.calcCanvasPaddingWidth();

  // small web window
  let graphSize = (window.innerWidth - 172) * 0.3;

  // // double card layout (smaller)
  // if(window.innerWidth > 768){
  //   graphSize = (window.innerWidth - 172) * 0.4;
  // }

  // iphone & ipad
  if(Meteor.isCordova){
    graphSize = window.innerWidth - 200;
  }

  let themePrimaryColor = get(Meteor, 'settings.public.theme.palette.primaryColor')


  let cardWidth = window.innerWidth - paddingWidth;

  let columnVisibility = {
    sampledData: false,
    codeValue: true
  }

  if(window.innerWidth > 1600){
    columnVisibility.sampledData = true;
  }
  if(Meteor.isCordova){
    columnVisibility.codeValue = false;
  }




  function handleFirstCardClick(){
    console.log('handleFirstCardClick ', AndreaSantillán);

    Session.set('selectedPatientId', AndreaSantillán.id);
    Session.set('selectedPatient', AndreaSantillán)
  }
  function handleSecondCardClick(){
    console.log('handleSecondCardClick ', AnnMedhurst);

    Session.set('selectedPatientId', AnnMedhurst.id);
    Session.set('selectedPatient', AnnMedhurst)
  }
  function handleThirdCardClick(){
    console.log('handleCardClick ', BillyeRau);

    Session.set('selectedPatientId', BillyeRau.id);
    Session.set('selectedPatient', BillyeRau)
  }

  // function selectCard(cardId){
  //   console.log('selectCard', cardId)
  //   setSelectedPatient(cardId)
  // }

  let cardStyle1 = {borderLeft: '10px solid white'};
  let cardStyle2 = {borderLeft: '10px solid white'};
  let cardStyle3 = {borderLeft: '10px solid white'};

  switch (data.selectedPatientId) {
    case 'befab5de-4562-37da-07d3-1a2b188b679a':
      cardStyle1 = {borderLeft: '10px solid green'}
      break;
    case 'c7f40e00-f81b-a1cc-8940-9bb3ea4cb235':
      cardStyle2 = {borderLeft: '10px solid green'}    
      break;
    case '06d367b1-bf0b-3bf9-dff7-8bebaf29236b':
      cardStyle3 = {borderLeft: '10px solid green'}      
      break;
  }

  return (
    <PageCanvas id='syntheaAnalysisPage' headerHeight={headerHeight} paddingLeft={paddingWidth} paddingRight={paddingWidth} >
      <Grid container justify="center" style={{marginBottom: '80px'}}>            
        <Grid item md={12} style={{textAlign: 'center'}}>
          {/* <DynamicSpacer /> */}
          <HGraph
            data={ data.currentYearData }
            score={ data.currentScore }
            width={ graphSize }
            height={ graphSize }
            fontSize={ graphSize < 300 ? 10 : 16 }
            pointRadius={ graphSize < 300 ? 5 : 10 }
            scoreFontSize={ graphSize < 300 ? 48 : 96 }
            healthyRangeFillColor={themePrimaryColor}
            showScore={true}
            margin={{ top: 72, right: 72, bottom: 140, left: 72 }}       
            zoomOnPointClick={false}     
          />     
          {/* <DynamicSpacer /> */}
        </Grid>
      </Grid>        
      <Grid container style={{position: 'fixed', bottom: '80px', left: '0px', paddingLeft: "100px", paddingRight: '100px', width: '100%'}}>      
        <Grid item lg={4}>
          <CardContent style={{fontSize: '180%', cursor: 'pointer'}} onClick={handleFirstCardClick.bind(this)}>
            <StyledCard margin={20} style={cardStyle1} >
              <CardHeader 
                title={firstPatientName} subheader={firstPatientId}
                />                                       
            </StyledCard>
          </CardContent>

        </Grid>
        <Grid item lg={4}>
          <CardContent style={{fontSize: '180%', cursor: 'pointer'}} onClick={handleSecondCardClick.bind(this)}>
            <StyledCard margin={20} style={cardStyle2} >
              <CardHeader 
                title={secondPatientName} subheader={secondPatientId}
                />                                       
            </StyledCard>
          </CardContent>
        </Grid>
        <Grid item lg={4}>
          <CardContent style={{fontSize: '180%', cursor: 'pointer'}} onClick={handleThirdCardClick.bind(this)}>
            <StyledCard margin={20} style={cardStyle3} >
              <CardHeader 
                title={thirdPatientName} subheader={thirdPatientId}
                />                                       
            </StyledCard>
          </CardContent>
        </Grid>
      </Grid>  
    </PageCanvas>
  );
}


export default SyntheaAnalysisPage;