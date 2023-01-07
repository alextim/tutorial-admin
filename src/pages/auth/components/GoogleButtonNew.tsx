import { useEffect, useRef } from 'react';

import type { UseMutateFunction } from '@pankod/refine-core';
import type { TLoginData } from '@pankod/refine-core/dist/interfaces';

type Props = {
  onCallback: UseMutateFunction<TLoginData, Error, object, unknown>;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
};

export const GoogleButtonNew = ({ onCallback, text }: Props): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.google || !divRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        ux_mode: 'popup',
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (res) => {
          if (res.credential) {
            onCallback(res);
          }
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_blue',
        size: 'medium',
        type: 'standard',
        text,
        width: '100%',
      });
    } catch (error) {
      console.log(error);
    }
  }, [onCallback, text]);

  return <div ref={divRef} />;
};
