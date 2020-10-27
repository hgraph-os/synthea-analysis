
import { Grid, CardHeader, CardContent, Typography } from '@material-ui/core';
import { StyledCard, PageCanvas, PatientsTable } from 'material-fhir-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';

import { get } from 'lodash';
import moment from 'moment';

import { Session } from 'meteor/session';
import { DynamicSpacer, ObservationsTable } from 'meteor/clinical:hl7-fhir-data-infrastructure';

import { Line } from '@nivo/line'

Session.setDefault('selectedPatientId', '');

export class SyntheaAnalysisPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let data = {
      chart: {
        width: Session.get('appWidth') * 0.5,  
        height: 400
      },
      organizations: {
        image: "/pages/provider-directory/organizations.jpg"
      },
      bmi: {
        height: 0,
        weight: 0
      },
      observations: Observations.find({'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId')}).fetch(),
      observationsCount: Observations.find({'subject.reference': 'urn:uuid:' + Session.get('selectedPatientId')}).count(),
      patients: Patients.find().fetch(),
      patientsCount: Patients.find().count(),
      selectedPatientId: Session.get('selectedPatientId')  
    };

    // if(Observations.find({'code.text': 'Weight'}).count() > 0){
    //   let recentWeight = Observations.find({'code.text': 'Weight'}, {sort: {effectiveDateTime: 1}}).fetch()[0];
    //   data.bmi.weight = get(recentWeight, 'valueQuantity.value', 0);
    // }
    // if(Observations.find({'code.text': 'Height'}).count() > 0){
    //   let recentHeight = Observations.find({'code.text': 'Height'}, {sort: {effectiveDateTime: 1}}).fetch()[0];
    //   data.bmi.height = get(recentHeight, 'valueQuantity.value', 0);
    // }

    if(process.env.NODE_ENV === "test") console.log("SyntheaAnalysisPage[data]", data);
    return data;
  }
  render() {
    // let observationQuery = {$or: [{'code.text': 'Height'}, {'code.text': 'Weight'}]}
    // let bmi = (this.data.bmi.weight / this.data.bmi.height / this.data.bmi.height * 10000).toFixed(2);

    // let headerHeight = 84;
    // if(get(Meteor, 'settings.public.defaults.prominantHeader')){
    //   headerHeight = 148;
    // }

    return (
        // <PageCanvas id='syntheaAnalysisPage' headerHeight={headerHeight} >
        //   <Grid container style={{marginTop: '40px', marginBottom: '80px'}}>            
        //     <Grid item md={6}>
        //       <StyledCard margins={20} >
        //         <CardHeader 
        //           title={this.data.patientsCount + " Patients"}
        //           />
        //         <CardContent style={{fontSize: '180%'}}>
        //           <PatientsTable 
        //             patients={Patients.find().fetch()}
        //             count={Patients.find().count()}
        //             hideIdentifier={true}
        //             hideActionIcons={true}
        //             hideAddress={true}
        //             hideCity={true}
        //             hideState={true}
        //             hidePostalCode={true}
        //             hideCountry={true}
        //             hideMaritalStatus={true}
        //             hideLanguage={true}
        //             hideActive={true}
        //             hideSystemBarcode={true}
        //             rowsPerPage={5}
        //             selectedPatientId={this.data.selectedPatientId}
        //             onRowClick={function(id){
        //               Session.set('selectedPatientId', id);
        //             }}
        //           />                      
        //         </CardContent>
        //       </StyledCard>
        //       <DynamicSpacer />
        //       <StyledCard margins={20} >
        //         <CardHeader 
        //           title={this.data.observationsCount + " Observations associated with the selected Patient"}
        //           />
        //         <CardContent style={{fontSize: '180%'}}>
        //           <ObservationsTable 
        //             observations={this.data.observations}
        //             count={this.data.observationsCount}
        //             multiline={true}
        //             rowsPerPage={10}
        //           />                      
        //         </CardContent>
        //       </StyledCard>

        //     </Grid>
        //     <Grid item md={6}>
              
        //     </Grid>
        //   </Grid>          
        // </PageCanvas>
    );
  }

  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}



ReactMixin(SyntheaAnalysisPage.prototype, ReactMeteorData);

export default SyntheaAnalysisPage;