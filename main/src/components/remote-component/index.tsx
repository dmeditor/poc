import React, { FC } from 'react';
import { useRemotes } from '../../context/remote';
import { findRemoteUrl, loadComponent } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

type Props = {
  fallback?: string | React.ReactNode;
  remoteName: string;
  moduleName: string;
  scope?: string;
  [key: string]: any;
};

export const RemoteComponent: FC<Props> = ({ remoteName, moduleName, scope = 'default', fallback = null, ...props }) => {
  const [remotes] = useRemotes();
  const remoteUrl = findRemoteUrl(remoteName, remotes);
  const Component = React.lazy(loadComponent(remoteName, remoteUrl, `./${moduleName}`, scope));

  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
