import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  DashboardOutlined,
  PermIdentity,
  PostAddOutlined,
  GroupWorkOutlined,
  AcUnitOutlined,
  WindowOutlined,
  ReceiptOutlined,
  SettingsOutlined,
  FlashOffOutlined,
  PersonAddOutlined,
  OfflineBoltOutlined
} from '@mui/icons-material';

import { Occupation } from './context/AuthContext';
import DashboardView from './views/DashboardView';
import CardFormView from './views/FormsView/PatientFormView';
import QuickLaboratoryTestFormView from './views/FormsView/QuickLaboratoryTestFormView';
import QuickPrescriptionFormView from './views/FormsView/QuickPrescriptionFormView';
import MedicalRequestFormView from './views/FormsView/MedicalRequestFormView';
import SettingsView from './views/SettingsView';
import AsstTableView from './views/TablesView/AsstTableView/Index';
import CardTableView from './views/TablesView/CardTableView';
import QuickLaboratoryTestTableView from './views/TablesView/QuickLaboratoryTestTableView';
import QuickPrescriptionTestTableView from './views/TablesView/QuickPrescriptionTestTable';
import MedicalCertificateFormView from './views/FormsView/MedicalCertificateFormView';
import RequestLaboratoryTestFormView from './views/FormsView/LaboratoryTestFormView/RequestLaboratoryTestFormView';
import CompleteLaboratoryTestFormView from './views/FormsView/LaboratoryTestFormView/CompleteLaboratoryTestFormView';
import PrescriptionTestTableView from './views/TablesView/PrescriptionTestTableView';
import DetailedCardView from './views/DetailedCardView/Index';
import LaboratoryTestTableView from './views/TablesView/LaboratoryTestTableView';
import PrescriptionTestFormView from './views/FormsView/PrescriptionTestFormView';

type Routes = {
  path: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  label?: string;
  routeOccupation: Occupation[];
  linkOccupation?: Occupation[];
  component?: () => JSX.Element;
};
export const useRoutes = function(): Routes[] {
  return [
    {
      path: '/app/dashboard',
      icon: DashboardOutlined,
      label: 'Dashboard',
      routeOccupation: ['ADMIN'],
      component: DashboardView
    },
    {
      path: '/app/data/card',
      icon: PermIdentity,
      label: 'Cards',
      routeOccupation: ['DOCTOR', 'RECEPTION'],
      component: CardTableView
    },
    {
      path: '/app/data/card/history',
      routeOccupation: ['DOCTOR'],
      component: DetailedCardView
    },
    {
      path: '/app/form/card',
      icon: PersonAddOutlined,
      label: 'Add a Card',
      routeOccupation: ['RECEPTION', 'DOCTOR'],
      linkOccupation: ['RECEPTION'],
      component: CardFormView
    },
    {
      path: '/app/form/quick-laboratory-test',
      icon: PostAddOutlined,
      label: 'Add Quick Laboratory Test',
      routeOccupation: ['RECEPTION', 'LABORATORIAN'],
      component: QuickLaboratoryTestFormView,
      linkOccupation: ['RECEPTION']
    },
    {
      path: '/app/form/quick-prescription-test',
      icon: PostAddOutlined,
      label: 'Add Quick Prescription Test',
      routeOccupation: ['RECEPTION', 'NURSE'],
      component: QuickPrescriptionFormView,
      linkOccupation: ['RECEPTION']
    },

    {
      path: '/app/data/laboratory-test',
      icon: GroupWorkOutlined,
      label: 'Laboratory Test',
      component: LaboratoryTestTableView,
      routeOccupation: ['DOCTOR', 'RECEPTION', 'LABORATORIAN']
    },
    {
      path: '/app/data/prescription-test',
      icon: AcUnitOutlined,
      label: 'Prescription Test',
      component: PrescriptionTestTableView,
      routeOccupation: ['DOCTOR', 'RECEPTION', 'NURSE']
    },
    {
      path: '/app/data/quick-laboratory-test',
      icon: OfflineBoltOutlined,
      label: 'Quick Laboratory Test',
      routeOccupation: ['RECEPTION', 'LABORATORIAN', 'DOCTOR'],
      component: QuickLaboratoryTestTableView
    },
    {
      path: '/app/data/quick-prescription-test',
      icon: FlashOffOutlined,
      label: 'Quick Prescription Tests',
      routeOccupation: ['RECEPTION', 'NURSE', 'DOCTOR'],
      component: QuickPrescriptionTestTableView
    },

    {
      path: '/app/form/laboratory-test/request',
      routeOccupation: ['DOCTOR'],
      component: RequestLaboratoryTestFormView
    },
    {
      path: '/app/form/laboratory-test/complete',
      routeOccupation: ['DOCTOR', 'LABORATORIAN'],
      component: CompleteLaboratoryTestFormView
    },
    {
      path: '/app/form/prescription-test',
      routeOccupation: ['DOCTOR', 'NURSE'],
      component: PrescriptionTestFormView
    },
    {
      path: '/app/form/medical/request',
      icon: WindowOutlined,
      label: 'Request Form',
      component: MedicalRequestFormView,
      routeOccupation: ['DOCTOR']
    },
    {
      path: '/app/data/cards/history/asst',
      icon: ReceiptOutlined,
      label: 'Weekly Asst',
      component: AsstTableView,
      routeOccupation: ['ADMIN']
    },
    {
      path: '/app/settings',
      icon: SettingsOutlined,
      label: 'Settings',
      component: SettingsView,
      routeOccupation: ['ADMIN', 'DOCTOR', 'LABORATORIAN', 'NURSE', 'RECEPTION']
    },
    {
      path: '/app/form/medical/certificate',
      component: MedicalCertificateFormView,
      routeOccupation: ['DOCTOR']
    },
    {
      path: '/app/form/medical/certificate',
      component: MedicalCertificateFormView,
      routeOccupation: ['ADMIN']
    }
  ];
};
