import { useEffect } from 'react';

import { useOverlaysContext } from './Overlays.context';
import { overlaysGlobals } from './Overlays.globals';

export interface IOverlayManagerHocProps {
  id: string;
  defaultVisible?: boolean;
  keepMounted?: boolean;
}

// const OverlayIdContext = createContext<string | null>(null);

// const create = <P extends {}>(
//   Component: React.ComponentType<P>,
// ): React.FC<P & IOverlayManagerHocProps> => {
//   return function OverlayComponentHoc({
//     defaultVisible,
//     keepMounted,
//     id,
//     ...props
//   }) {
//     const { args, show } = useOverlay(id);

//     // If there's modal state, then should mount it.
//     const modals = useOverlaysContext();
//     const shouldMount = !!modals[id];

//     useEffect(() => {
//       // If defaultVisible, show it after mounted.
//       if (defaultVisible) {
//         show();
//       }

//       overlaysGlobals.alreadyMounted[id] = true;

//       return () => {
//         delete overlaysGlobals.alreadyMounted[id];
//       };
//     }, [id, show, defaultVisible]);

//     useEffect(() => {
//       if (keepMounted) {
//         setFlags(id, { keepMounted: true });
//       }
//     }, [id, keepMounted]);

//     const delayVisible = modals[id]?.delayVisible;
//     // If modal.show is called
//     //  1. If modal was mounted, should make it visible directly
//     //  2. If modal has not been mounted, should mount it first, then make it visible
//     useEffect(() => {
//       if (delayVisible) {
//         // delayVisible: false => true, it means the modal.show() is called, should show it.
//         show(args);
//       }
//     }, [delayVisible, args, show]);

//     if (!shouldMount) {
//       return null;
//     }
//     return (
//       <NiceModalIdContext.Provider value={id}>
//         <Comp {...(props as P)} {...args} />
//       </NiceModalIdContext.Provider>
//     );
//   };
// };

const show = (component: React.ReactNode): void => {
  console.log('__SHOW!!');

  const modalId = 'x';

  overlaysGlobals.dispatch({
    type: 'sixui-modal/show',
    payload: {
      id: 'test',
      args: {},
    },
  });

  if (!overlaysGlobals.callbacks[modalId]) {
    // `!` tell ts that theResolve will be written before it is used
    let theResolve!: (args?: unknown) => void;
    // `!` tell ts that theResolve will be written before it is used
    let theReject!: (args?: unknown) => void;
    const promise = new Promise((resolve, reject) => {
      theResolve = resolve;
      theReject = reject;
    });
    overlaysGlobals.callbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    };
  }

  return overlaysGlobals.callbacks[modalId].promise;
};

export const OverlaysManager = {
  // create,
  show,
};
