import React from 'react';

import SyntheaAnalysisPage from './client/SyntheaAnalysisPage';
import SyntheaAboutDialog from './client/SyntheaAboutDialog';
import hGraphDemoPage from './client/hGraphDemoPage';




// import { 
//   SyntheaAnalysisFooter
// } from './client/SyntheaAnalysisFooter';


var DynamicRoutes = [{
  'name': 'SyntheaAnalysisPage',
  'path': '/synthea-analysis',
  'component': SyntheaAnalysisPage
}, {
  'name': 'hGraphDemoPage',
  'path': '/hgraph-demo',
  'component': hGraphDemoPage
}];

var SidebarWorkflows = [{
  'primaryText': 'hGraph Demo',
  'to': '/hgraph-demo',
  'href': '/hgraph-demo',
  'iconName': 'healthgraph'
}, {
  'primaryText': 'Synthea Analysis',
  'to': '/synthea-analysis',
  'href': '/synthea-analysis',
  'iconName': 'addressBook'
}];

let DialogComponents = [ {
  name: "SyntheaAboutDialog",
  component: <SyntheaAboutDialog />
}]


// let FooterButtons = [{
//   pathname: '/',
//   component: <SyntheaAnalysisFooter />
// }, {
//   pathname: '/synthea-analysis',
//   component: <SyntheaAnalysisFooter />
// }];


let MainPage = SyntheaAnalysisPage;

export { MainPage, SidebarWorkflows, DynamicRoutes, DialogComponents, hGraphDemoPage, SyntheaAnalysisPage };
