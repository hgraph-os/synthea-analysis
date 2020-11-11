import React from 'react';

import SyntheaAnalysisPage from './client/SyntheaAnalysisPage';
import ExperimentalPage from './client/ExperimentalPage';
import SyntheaAboutDialog from './client/SyntheaAboutDialog';

import { 
  SyntheaAnalysisFooter
} from './client/SyntheaAnalysisFooter';


var DynamicRoutes = [{
  'name': 'SyntheaAnalysisPage',
  'path': '/synthea-analysis',
  'component': SyntheaAnalysisPage
}, {
  'name': 'ExperimentalPage',
  'path': '/experimental-analysis',
  'component': ExperimentalPage
}];

var SidebarWorkflows = [{
  'primaryText': 'Synthea Analysis',
  'to': '/synthea-analysis',
  'href': '/synthea-analysis',
  'iconName': 'addressBook'
}];

let DialogComponents = [ {
  name: "SyntheaAboutDialog",
  component: <SyntheaAboutDialog />
}]


let FooterButtons = [{
  pathname: '/',
  component: <SyntheaAnalysisFooter />
}, {
  pathname: '/synthea-analysis',
  component: <SyntheaAnalysisFooter />
}];


let MainPage = SyntheaAnalysisPage;

export { MainPage, FooterButtons, SidebarWorkflows, DynamicRoutes, DialogComponents, SamplePage, PostcardPage, SyntheaAnalysisPage };
