
import React from 'react';

import { get, has } from 'lodash';
import { Session } from 'meteor/session';

import moment from 'moment';


import Grid from '@material-ui/core/Grid';

import { ResponsivePie } from '@nivo/pie'

import HGraph from 'hgraph-react'; 
import { StyledCard, PageCanvas } from 'material-fhir-ui';



let sampleData = [
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
    "healthMin": 100,
    "healthMax": 140,
    "absoluteMin": 80,
    "absoluteMax": 200,
    "value": 120
  },
  {
    "metric": "bloodPressureDiastolic",
    "label": "Diastolic blood pressure",
    "healthMin": 60,
    "healthMax": 100,
    "absoluteMin": 0,
    "absoluteMax": 200,
    "value": 80
  },
  {
    "metric": "weight",
    "label": "Body weight Measured",
    "healthMin": 120,
    "healthMax": 200,
    "absoluteMin": 80,
    "absoluteMax": 240,
    "value": 140
  },
  {
    "metric": "pulse",
    "label": "Heart rate",
    "healthMin": 50,
    "healthMax": 80,
    "absoluteMin": 30,
    "absoluteMax": 120,
    "value": 60
  },
  {
    "metric": "bloodOxygenation",
    "label": "Oxygen saturation in Blood",
    "healthMin": 90,
    "healthMax": 100,
    "absoluteMin": 70,
    "absoluteMax": 100,
    "value": 98
  },
  {
    "metric": "temperature",
    "label": "Body temperature",
    "healthMin": 96,
    "healthMax": 99,
    "absoluteMin": 94,
    "absoluteMax": 106,
    "value": 98.6
  }
];

let pieData = [
  {
    "id": "scala",
    "label": "scala",
    "value": 391,
    "color": "hsl(29, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 140,
    "color": "hsl(225, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 302,
    "color": "hsl(160, 70%, 50%)"
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 508,
    "color": "hsl(249, 70%, 50%)"
  },
  {
    "id": "elixir",
    "label": "elixir",
    "value": 202,
    "color": "hsl(269, 70%, 50%)"
  }
];




//==========================================================================================
// Main Component

function ExperimentalPage(props){

  return (
    <PageCanvas id='experimentalPage' headerHeight={148}  >
      <Grid container style={{marginTop: '40px', marginBottom: '80px'}}>            
        <Grid item md={6}> 
          <StyledCard id="encounterMixDateRangeCard"  >
            <div id='responsivePieContainer' style={{height: '600px', width: '600px'}}>
              <ResponsivePie                  
                  data={pieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'nivo' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: 'color' }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                      {
                          id: 'dots',
                          type: 'patternDots',
                          background: 'inherit',
                          color: 'rgba(255, 255, 255, 0.3)',
                          size: 4,
                          padding: 1,
                          stagger: true
                      },
                      {
                          id: 'lines',
                          type: 'patternLines',
                          background: 'inherit',
                          color: 'rgba(255, 255, 255, 0.3)',
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10
                      }
                  ]}
                  fill={[
                      {
                          match: {
                              id: 'ruby'
                          },
                          id: 'dots'
                      },
                      {
                          match: {
                              id: 'c'
                          },
                          id: 'dots'
                      },
                      {
                          match: {
                              id: 'go'
                          },
                          id: 'dots'
                      },
                      {
                          match: {
                              id: 'python'
                          },
                          id: 'dots'
                      },
                      {
                          match: {
                              id: 'scala'
                          },
                          id: 'lines'
                      },
                      {
                          match: {
                              id: 'lisp'
                          },
                          id: 'lines'
                      },
                      {
                          match: {
                              id: 'elixir'
                          },
                          id: 'lines'
                      },
                      {
                          match: {
                              id: 'javascript'
                          },
                          id: 'lines'
                      }
                  ]}
                  legends={[
                      {
                          anchor: 'bottom',
                          direction: 'row',
                          translateY: 56,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: '#999',
                          symbolSize: 18,
                          symbolShape: 'circle',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemTextColor: '#000'
                                  }
                              }
                          ]
                      }
                  ]}
              />   
            </div>
          </StyledCard>

               
        </Grid>
      </Grid>          
    </PageCanvas>
  );
}




export default ExperimentalPage;