import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar
} from 'notistack';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { NotifAction } from '../@types/Notification';
import {
  Notification,
  useNotificationsQuery,
  NewNotificationSubscriptionDocument,
  useClearNotificationMutation,
  useDeleteNotificationMutation,
  DeleteNotificationSubscriptionDocument,
  Occupation
} from '../generated/graphql';
import { AuthContext } from './AuthContext';

type ContextType = {
  count: number;
  notifications: Notification[];
  handleClearNotifications: () => Promise<boolean | undefined>;
  handleDeleteNotification: (id: string) => Promise<boolean | undefined>;
};

const NotificationContext = createContext<ContextType>({
  count: 0,
  notifications: [],
  handleClearNotifications: async () => false,
  handleDeleteNotification: async id => false
});

type State = {
  notifications: Notification[];
  count: number;
};
type Action = {
  type: Occupation;
  payload: {
    notification: Notification[];
    newNotification?: Notification;
    enqueueSnackbar?: (
      message: SnackbarMessage,
      options?: OptionsObject | undefined
    ) => SnackbarKey;
  };
};
const notificationReducer = function(
  state: State,
  { type, payload: { notification, enqueueSnackbar, newNotification } }: Action
) {
  switch (type) {
    case Occupation.Admin:
      const doctorNotif = notification.filter(
        ({ action }) =>
          (action as NotifAction) === 'COMPLETE_LABORATORY_TEST' ||
          (action as NotifAction) === 'COMPLETE_PRESCRIPTION' ||
          (action as NotifAction) === 'MARK_CARD_AS_NEW' ||
          (action as NotifAction) === 'CREATE_CARD' ||
          (action as NotifAction) === 'PAY_FOR_QUICK_LABORATORY_TEST' ||
          (action as NotifAction) === 'PAY_FOR_QUICK_PRESCRIPTION_TEST'
      );
      enqueueSnackbar &&
        doctorNotif[0] === newNotification &&
        enqueueSnackbar(newNotification.desc, {
          variant: 'success'
        });
      return {
        notifications: doctorNotif,
        count: doctorNotif.length
      };
    case Occupation.Reception:
      const receptionNotif = notification.filter(
        ({ action }) =>
          (action as NotifAction) === 'CREATE_PRESCRIPTION' ||
          (action as NotifAction) === 'CREATE_LABORATORY_TEST' ||
          (action as NotifAction) === 'COMPLETE_QUICK_LABORATORY_TEST' ||
          (action as NotifAction) === 'COMPLETE_QUICK_PRESCRIPTION_TEST'
      );
      enqueueSnackbar &&
        receptionNotif[0] === newNotification &&
        enqueueSnackbar(newNotification.desc, {
          variant: 'success'
        });
      return {
        notifications: receptionNotif,
        count: receptionNotif.length
      };
    case Occupation.Laboratory:
      const laboratoryNotification = notification.filter(
        ({ action }) =>
          (action as NotifAction) === 'PAY_FOR_LABORATORY_TEST' ||
          (action as NotifAction) === 'CREATE_QUICK_LABORATORY_TEST'
      );
      enqueueSnackbar &&
        laboratoryNotification[0] === newNotification &&
        enqueueSnackbar(newNotification.desc, {
          variant: 'success'
        });
      return {
        notifications: laboratoryNotification,
        count: laboratoryNotification.length
      };
    case Occupation.Nurse:
      const prescriptionNotification = notification.filter(
        ({ action }) =>
          (action as NotifAction) === 'PAY_FOR_PRESCRIPTION' ||
          (action as NotifAction) === 'CREATE_QUICK_PRESCRIPTION_TEST'
      );
      enqueueSnackbar &&
        prescriptionNotification[0] === newNotification &&
        enqueueSnackbar(newNotification.desc, {
          variant: 'success'
        });
      return {
        notifications: prescriptionNotification,
        count: prescriptionNotification.length
      };

    default:
      return {
        notifications: [],
        count: 0
      };
  }
};
const initialNotification: State = {
  count: 0,
  notifications: []
};
const NotificationProvider: React.FC = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialNotification
  );
  const { occupation } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const { data, subscribeToMore } = useNotificationsQuery();
  const [clearNotifications] = useClearNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  useEffect(() => {
    if (!data) return;
    dispatch({
      type: occupation,
      payload: { notification: data.notifications }
    });
  }, [data]);

  useEffect(() => {
    console.log('start');
    if (occupation === Occupation.Admin) return;
    subscribeToMore({
      document: NewNotificationSubscriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        const newNotification: Notification = (subscriptionData.data as any)
          .newNotificationSubscription;
        console.log(prev, 'sdfh');
        // if (!newNotification) return prev;
        dispatch({
          type: occupation,
          payload: {
            notification: prev.notifications
              ? [newNotification, ...prev.notifications]
              : [newNotification],
            newNotification,
            enqueueSnackbar
          }
        });
        console.log(notification);
        return Object.assign({}, prev, {
          notifications: prev.notifications
            ? [newNotification, ...prev.notifications]
            : [newNotification]
        });
      }
    });
    subscribeToMore({
      document: DeleteNotificationSubscriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        const deleteNotif: Notification = (subscriptionData.data as any)
          .deleteNotificationSubscription;
        console.log(deleteNotif, 'deleted ntoif');
        // if (!deleteNotif) return prev;
        const withoutDeletedNotification = prev.notifications.filter(
          notif => notif.id !== deleteNotif.id
        );
        console.log(withoutDeletedNotification, prev);
        dispatch({
          type: occupation,
          payload: {
            notification: withoutDeletedNotification
          }
        });
        return Object.assign({}, prev, {
          notifications: withoutDeletedNotification
        });
      }
    });
  }, [occupation]);

  const handleClearNotifications = async () => {
    return (await clearNotifications()).data?.clearNotification;
  };
  const handleDeleteNotification = async (id: string) => {
    return (await deleteNotification({ variables: { id } })).data
      ?.deleteNotification;
  };

  return (
    <NotificationContext.Provider
      value={{
        count: notification.count,
        notifications: notification.notifications,
        handleClearNotifications,
        handleDeleteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
