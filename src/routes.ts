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

import DashboardView from './views/DashboardView';
import CardFormView from './views/FormsView/PatientFormView';
import QuickLaboratoryTestFormView from './views/FormsView/QuickLaboratoryTestFormView';
import QuickPrescriptionFormView from './views/FormsView/QuickPrescriptionFormView';
import MedicalRequestFormView from './views/FormsView/MedicalRequestFormView';
import SettingsView from './views/SettingsView';
import AsstTableView from './views/TablesView/AsstTableView/Index';
import CardTableView from './views/TablesView/CardTableView';
import QuickLaboratoryTestExaminationView from './views/TablesView/QuickLaboratoryExaminationTableView';
import QuickPrescriptionTestTableView from './views/TablesView/QuickPrescriptionTestTable';
import MedicalCertificateFormView from './views/FormsView/MedicalCertificateFormView';
import RequestLaboratoryExaminationFormView from './views/FormsView/LaboratoryExaminationFormView/RequestForm';
import CompleteLaboratoryExaminationFormView from './views/FormsView/LaboratoryExaminationFormView/CompleteForm';
import PrescriptionTestTableView from './views/TablesView/PrescriptionTestTableView';
import DetailedCardView from './views/DetailedCardView/Index';
import LaboratoryTestTableView from './views/TablesView/LaboratoryTestTableView';
import PrescriptionTestFormView from './views/FormsView/PrescriptionTestFormView';
import { Occupation } from './generated/graphql';

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
      routeOccupation: [Occupation.Admin],
      component: DashboardView
    },
    {
      path: '/app/data/card',
      icon: PermIdentity,
      label: 'Cards',
      routeOccupation: [Occupation.Doctor, Occupation.Reception],
      component: CardTableView
    },
    {
      path: '/app/data/card/history',
      routeOccupation: [Occupation.Doctor],
      component: DetailedCardView
    },
    {
      path: '/app/form/card',
      icon: PersonAddOutlined,
      label: 'Add a Card',
      routeOccupation: [Occupation.Reception, Occupation.Doctor],
      linkOccupation: [Occupation.Reception],
      component: CardFormView
    },
    {
      path: '/app/form/quick-laboratory-test',
      icon: PostAddOutlined,
      label: 'Add Quick Laboratory Test',
      routeOccupation: [Occupation.Reception, Occupation.Laboratory],
      component: QuickLaboratoryTestFormView,
      linkOccupation: [Occupation.Reception]
    },
    {
      path: '/app/form/quick-prescription-test',
      icon: PostAddOutlined,
      label: 'Add Quick Prescription Test',
      routeOccupation: [Occupation.Reception, Occupation.Nurse],
      component: QuickPrescriptionFormView,
      linkOccupation: [Occupation.Reception]
    },

    {
      path: '/app/data/laboratory-test',
      icon: GroupWorkOutlined,
      label: 'Laboratory Test',
      component: LaboratoryTestTableView,
      routeOccupation: [
        Occupation.Doctor,
        Occupation.Reception,
        Occupation.Laboratory
      ]
    },
    {
      path: '/app/data/prescription-test',
      icon: AcUnitOutlined,
      label: 'Prescription Test',
      component: PrescriptionTestTableView,
      routeOccupation: [
        Occupation.Doctor,
        Occupation.Reception,
        Occupation.Nurse
      ]
    },
    {
      path: '/app/data/quick-laboratory-test',
      icon: OfflineBoltOutlined,
      label: 'Quick Laboratory Test',
      routeOccupation: [
        Occupation.Reception,
        Occupation.Laboratory,
        Occupation.Doctor
      ],
      component: QuickLaboratoryTestExaminationView
    },
    {
      path: '/app/data/quick-prescription-test',
      icon: FlashOffOutlined,
      label: 'Quick Prescription Tests',
      routeOccupation: [
        Occupation.Reception,
        Occupation.Nurse,
        Occupation.Doctor
      ],
      component: QuickPrescriptionTestTableView
    },

    {
      path: '/app/form/laboratory-test/request',
      routeOccupation: [Occupation.Doctor],
      component: RequestLaboratoryExaminationFormView
    },
    {
      path: '/app/form/laboratory-test/complete',
      routeOccupation: [Occupation.Doctor, Occupation.Laboratory],
      component: CompleteLaboratoryExaminationFormView
    },
    {
      path: '/app/form/prescription-test',
      routeOccupation: [Occupation.Doctor, Occupation.Nurse],
      component: PrescriptionTestFormView
    },
    {
      path: '/app/form/medical/request',
      icon: WindowOutlined,
      label: 'Request Form',
      component: MedicalRequestFormView,
      routeOccupation: [Occupation.Doctor]
    },
    {
      path: '/app/data/cards/history/asst',
      icon: ReceiptOutlined,
      label: 'Weekly Asst',
      component: AsstTableView,
      routeOccupation: [Occupation.Admin]
    },
    {
      path: '/app/settings',
      icon: SettingsOutlined,
      label: 'Settings',
      component: SettingsView,
      routeOccupation: [
        Occupation.Admin,
        Occupation.Doctor,
        Occupation.Laboratory,
        Occupation.Nurse,
        Occupation.Reception
      ]
    },
    {
      path: '/app/form/medical/certificate',
      component: MedicalCertificateFormView,
      routeOccupation: [Occupation.Doctor]
    },
    {
      path: '/app/form/medical/certificate',
      component: MedicalCertificateFormView,
      routeOccupation: [Occupation.Admin]
    }
  ];
};
