import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { AllergyIntolerances, CarePlans, Conditions, Devices, DiagnosticReports, Encounters, ExplanationOfBenefits, Immunizations, Medications, MedicationStatements, Observations, Patients, Procedures } from 'meteor/clinical:hl7-fhir-data-infrastructure';

if(Meteor.isClient){
  console.log('Subscribing to FHIR cursors via websockets.');

  Meteor.subscribe('AllergyIntolerances');
  Meteor.subscribe('CarePlans');
  Meteor.subscribe('Conditions');
  Meteor.subscribe('Devices');
  Meteor.subscribe('DiagnosticReports');
  Meteor.subscribe('Encounters');
  Meteor.subscribe('ExplanationOfBenefits');
  Meteor.subscribe('Immunizations');
  Meteor.subscribe('Medications');
  Meteor.subscribe('MedicationStatements');
  Meteor.subscribe('Observations');
  Meteor.subscribe('Patients');
  Meteor.subscribe('Procedures');
}


if(Meteor.isServer){
  console.log('Publishing FHIR cursors over websockets.');

  Meteor.publish('AllergyIntolerances', function(){
    return AllergyIntolerances.find();
  });    
  Meteor.publish('CarePlans', function(){
    return CarePlans.find();
  });         
  Meteor.publish('Conditions', function(){
    return Conditions.find();
  });    
  Meteor.publish('Devices', function(){
    return Devices.find();
  });         
  Meteor.publish('DiagnosticReports', function(){
    return DiagnosticReports.find();
  });    
  Meteor.publish('Encounters', function(){
    return Encounters.find();
  });         
  Meteor.publish('ExplanationOfBenefits', function(){
    return ExplanationOfBenefits.find();
  });    
  Meteor.publish('Immunizations', function(){
    return Immunizations.find();
  });         
  Meteor.publish('Medications', function(){
    return Medications.find();
  });    
  Meteor.publish('MedicationStatements', function(){
    return MedicationStatements.find();
  });         
  Meteor.publish('Observations', function(){
    return Observations.find();
  });    
  Meteor.publish('Patients', function(){
    return Patients.find();
  });         
  Meteor.publish('Procedures', function(){
    return Procedures.find();
  });         
}
