
import SyntheaAnalysisPage from './client/SyntheaAnalysisPage';

var DynamicRoutes = [{
  'name': 'SyntheaAnalysisPage',
  'path': '/synthea-analysis',
  'component': SyntheaAnalysisPage
}];

var SidebarWorkflows = [{
  'primaryText': 'Synthea Analysis',
  'to': '/synthea-analysis',
  'href': '/synthea-analysis',
  'iconName': 'addressBook'
}];

let MainPage = SyntheaAnalysisPage;

export { MainPage, SidebarWorkflows, DynamicRoutes, SamplePage, PostcardPage, SyntheaAnalysisPage };
