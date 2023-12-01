import { FC, createContext, useContext, useState } from 'react';

export interface Remote {
  name: string;
  url?: string;
}

export interface Remotes {
  remotes: Remote[];
  updateRemoteUrl: (name: string, newUrl: string) => void;
}

const initRemotes = [
  { name: 'Widget', url: 'https://widget-vert.vercel.app/' },
  {
    name: 'Widget1',
    url: 'http://localhost:9002',
  },
];

const initState: Remotes = {
  remotes: initRemotes,
  updateRemoteUrl: () => {},
};

export const RemotesContext = createContext(initState);

export const RemotesProvider: FC<{ children: any }> = ({ children }) => {
  const [remotes, setRemotes] = useState<Remote[]>(initRemotes);

  const updateRemoteUrl = (name: string, newUrl: string): void => {
    setRemotes((prevRemotes) => {
      const newRemotes = [...prevRemotes];
      const remoteIdx = newRemotes.findIndex((r) => r.name === name);

      if (~remoteIdx) {
        newRemotes[remoteIdx].url = newUrl;
      }

      return newRemotes;
    });
  };

  const RemotesCtx: Remotes = {
    remotes,
    updateRemoteUrl,
  };

  return <RemotesContext.Provider value={RemotesCtx}>{children}</RemotesContext.Provider>;
};

export const useRemotes = (): [Remote[], (name: string, newUrl: string) => void] => {
  const { remotes, updateRemoteUrl } = useContext(RemotesContext);

  return [remotes, updateRemoteUrl];
};
