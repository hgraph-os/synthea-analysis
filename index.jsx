
import SyntheaAnalysisPage from './client/SyntheaAnalysisPage';
import ExperimentalPage from './client/ExperimentalPage';

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
}, {
  'primaryText': 'Experimental',
  'to': '/experimental-analysis',
  'href': '/experimental-analysis',
  'iconName': 'addressBook'
}];

let MainPage = SyntheaAnalysisPage;

export { MainPage, SidebarWorkflows, DynamicRoutes, SamplePage, PostcardPage, SyntheaAnalysisPage };
